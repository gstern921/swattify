exports.paginate = ({ maximumPageSize, defaultPageSize }) => (req, res, next) => {
  const MINIMUM_PAGE_SIZE = 1;
  const DEFAULT_PAGE_SIZE = defaultPageSize || 10;
  const MAXIMUM_PAGE_SIZE = maximumPageSize || 20;

  let limit = +req.query.limit;
  if (Number.isNaN(limit)) {
    limit = DEFAULT_PAGE_SIZE;
  } else {
    limit = Math.max(limit, MINIMUM_PAGE_SIZE);
    limit = Math.min(limit, MAXIMUM_PAGE_SIZE);
  }

  let offset = +req.query.offset;
  if (Number.isNaN(offset)) {
    offset = 0;
  }

  // In case a negative offset is given
  offset = Math.max(offset, 0);

  req.paginateLimit = limit;
  req.paginateOffset = offset;

  next();
};
