const getPercentage = (start, finish, actual) => {
  return ((actual - start) * 100) / (finish - start);
};

const findLastIndex = (predicate, arr = []) =>
  arr.indexOf([...arr].reverse().find(predicate));

const scrollSteps = [0, 700, 1400, 2100];

const animationConfig = [
  {
    selector: ".small-ilustra-1",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: 150 },
      "1000": { x: 0, y: 150 },
      [scrollSteps[2]]: { x: -40, y: -70 },
      [scrollSteps[3]]: { x: -40, y: -800 }
    }
  },
  {
    selector: ".small-ilustra-2",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: 150 },
      "1000": { x: 0, y: 150 },
      [scrollSteps[2]]: { x: -114, y: -180 },
      [scrollSteps[3]]: { x: -114, y: -800 }
    }
  },
  {
    selector: ".small-ilustra-3",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: 150 },
      "1000": { x: 0, y: 150 },
      [scrollSteps[2]]: { x: 0, y: -136 },
      [scrollSteps[3]]: { x: 0, y: -800 }
    }
  },
  {
    selector: ".small-ilustra-4",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: 150 },
      "1000": { x: 0, y: 150 },
      [scrollSteps[2]]: { x: -40, y: -150 },
      [scrollSteps[3]]: { x: -40, y: -800 }
    }
  },
  {
    selector: ".small-ilustra-5",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: 150 },
      "1000": { x: 0, y: 150 },
      [scrollSteps[2]]: { x: 100, y: -120 },
      [scrollSteps[3]]: { x: 100, y: -800 }
    }
  },
  {
    selector: ".small-ilustra-6",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: 150 },
      "1000": { x: 0, y: 150 },
      [scrollSteps[2]]: { x: 30, y: -240 },
      [scrollSteps[3]]: { x: 30, y: -800 }
    }
  },

  //**----------------------------------- */
  {
    selector: ".ilustra-1",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      [scrollSteps[1]]: { x: 0, y: -800 }
    }
  },
  {
    selector: ".ilustra-2",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      "550": { x: 0, y: 140 },
      [scrollSteps[1]]: { x: 0, y: 180 },
      [scrollSteps[2]]: { x: 0, y: -800 }
    }
  },

  {
    selector: ".ilustra-3",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      "550": { x: 0, y: 150 },
      [scrollSteps[1]]: { x: 0, y: 180 },
      [scrollSteps[2]]: { x: 0, y: 180 },
      [scrollSteps[3]]: { x: 0, y: -800 }
    }
  },
  {
    selector: ".ilustra-4",
    steps: {
      [scrollSteps[0]]: { x: 0, y: 0 },
      "550": { x: 0, y: 160 },
      [scrollSteps[1]]: { x: 0, y: 180 },
      [scrollSteps[2]]: { x: 0, y: 180 },
      [scrollSteps[3]]: { x: 0, y: -100 }
    }
  }
];

window.scrollTo(0, 0);

function startScrollSnapping(steps) {
  let timer;

  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const currentStepIndex = findLastIndex(step => step <= scroll, steps);
    const nextStepIndex = currentStepIndex + 1;

    if (steps[nextStepIndex]) {
      const currentStep = steps[currentStepIndex];
      const nextStep = steps[nextStepIndex];

      const percentageOfScroll = getPercentage(currentStep, nextStep, scroll);

      const newPosition = percentageOfScroll > 50 ? nextStep : currentStep;

      clearTimeout(timer);
      timer = setTimeout(
        () => window.scroll({ top: newPosition, behavior: "smooth" }),
        66
      );
    }
  });
}

window.onload = () => {
  const animation = new ScrollAnimationBuilder(animationConfig);
  startScrollSnapping(scrollSteps);
  animation.begin();
};
