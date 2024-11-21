const DEFAULT_PAGE_NUMBER = 1;
// const DEFAULT_PAGE_LIMIT = 50;
// setting limit to zero tells mongo to return all the elements in a collection
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  // Math.abs ensures the number is positive and converts the string into a number
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit; // skips the number of documents to skip based on the page and limit

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
