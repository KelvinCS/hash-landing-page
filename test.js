const scroll = 350;
const start = 700;
const finish = 1400;

const percent = 50;

// const y = (() => {
//   const numsRange = range(10, -10);
//   const numIndex = Math.round(Math.abs((percent * numsRange.length) / 100));
//   return numsRange[numIndex];
// })();

function range(start, finish) {
  const max = Math.max(start, finish);
  const min = Math.min(start, finish);

  const result = [];

  for (let i = min; i <= max; i++) {
    result.push(i);
  }

  if (start > finish) {
    return result.reverse();
  }

  return result;
}

const percentageLaw = (a, b, p) => {
  const parts = (b - a) / 100;

  return a + parts * p;
};

console.log(percentageLaw(150, -180, 50));

//console.log(range(-50, -90));
