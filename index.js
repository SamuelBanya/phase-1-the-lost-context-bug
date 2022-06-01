const messageConfig = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
};

const originalPrintCard = function() {
  console.log(this.frontContent);
  console.log(this.insideContent);

  console.log("Debug Before forEach: " + this);
  this.signatories.forEach(function(signatory) {
    console.log("Debug inside forEach: " + this);
    // const message = `${this.closing[signatory]}, ${signatory})`;
    // console.log(message);
  });
};

// Solution 1:
// Use 'thisArg' to avoid lost context bug:
const printCardSolution1 = function() {
  console.log(this.frontContent);
  console.log(this.insideContent);

  console.log("Debug Before forEach: " + this);
  this.signatories.forEach(function(signatory) {
    console.log("Debug inside forEach: " + this);
    const message = `${this.closing[signatory]}, ${signatory})`;
    console.log(message);
    // Adding 'thisArg' at the end of the '.forEach()' call as per MDN:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  }, this);
};

const printCardSolution2 = function() {
  console.log(this.frontContent);
  console.log(this.insideContent);

  console.log("Debug Before forEach: " + this);
  const contextBoundForEachExpr = function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);
    // This .bind() line allows us to call the 'contextBoundForEachExpr' function later since we are passing in the function with '.bind()':
  }.bind(this);

  this.signatories.forEach(contextBoundForEachExpr);
};

const printCardSolution3 = function() {
  console.log(this.frontContent);
  console.log(this.insideContent);

  // NOTE: Most JS dev's use 'self' in this context:
  const outerContext = this;

  this.signatories.forEach(function (signatory) {
    const message = `${outerContext.closing[signatory]}, ${signatory}`;
    console.log(message);
  });
};

const printCardSolution4 = function() {
  console.log(this.frontContent);
  console.log(this.insideContent);
  // This uses an arrow function which does NOT have its own execution context, so this is why this pattern is so often used:
  this.signatories.forEach((signatory) =>
    console.log(`${this.closing[signatory]}, ${signatory}`)
  );
};

console.log("messageConfig.closing.Thor: ", messageConfig.closing.Thor);

originalPrintCard.call(messageConfig);
printCardSolution1(messageConfig);
printCardSolution2(messageConfig);
printCardSolution3(messageConfig);
printCardSolution4(messageConfig);
