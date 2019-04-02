const findLast = (predicate, arr) => [...arr].reverse().find(predicate);

const percentageLaw = (start, finish, percentage) => {
  const partsSize = (finish - start) / 100;

  return start + partsSize * percentage;
};

class ScrollAnimationBuilder {
  constructor(animationParts) {
    this.lastScrollPosition = window.scrollY;
    this.desloc = window.screenY;
    this.scrollDirection = "down";

    this.animationElements = this._resolveAnimationElements(animationParts);
  }

  begin() {
    window.onscroll = () => this._update();
  }

  _resolveAnimationElements(animationParts) {
    return animationParts.map(part => ({
      ...part,
      element: document.querySelector(part.selector)
    }));
  }

  _update() {
    this.desloc = window.scrollY;
    this.scrollDirection = scrollY >= this.lastScrollPosition ? "down" : "up";
    this.lastScrollPosition = this.desloc;

    this.animationElements.forEach(item => {
      const { prevBreakPoint, nextBreakPoint } = this._getBreakPoints(
        item.steps
      );

      const nextCoords = item.steps[nextBreakPoint];
      const prevCoords = item.steps[prevBreakPoint];

      const { x, y } = this._getNewCoords(
        prevBreakPoint,
        nextBreakPoint,
        prevCoords,
        nextCoords
      );

      item.element.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  _getNewCoords(prevBreakPoint, nextBreakPoint, prevCoords, nextCoords) {
    if (!prevCoords || !nextCoords) {
      return prevCoords || nextCoords;
    }

    const percentageOfDesloc = this._getPercentageOfDesloc(
      prevBreakPoint,
      nextBreakPoint
    );

    return {
      y: this._getDeslocInPx(percentageOfDesloc, prevCoords.y, nextCoords.y),
      x: this._getDeslocInPx(percentageOfDesloc, prevCoords.x, nextCoords.x)
    };
  }

  _getDeslocInPx(percentageOfDesloc, prevPosition, nextPosition) {
    if (prevPosition == nextPosition) return nextPosition;

    return percentageLaw(prevPosition, nextPosition, percentageOfDesloc);
  }

  _getPercentageOfDesloc(start, finish) {
    if (this.desloc == 0) return 0;

    return ((this.desloc - start) * 100) / (finish - start);
  }

  _getBreakPoints(steps) {
    const keys = Object.keys(steps).map(key => parseInt(key));

    const prev = findLast(key => this.desloc >= key, keys);
    const next = keys.find(key => this.desloc <= key);

    if (this.scrollDirection == "up") {
      return { nextBreakPoint: prev, prevBreakPoint: next };
    }

    return { nextBreakPoint: next, prevBreakPoint: prev };
  }
}
