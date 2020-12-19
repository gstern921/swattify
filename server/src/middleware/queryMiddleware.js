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

exports.sort = ([ ...sortableFields ]) => (req, res, next) => {

  const sortQuery = req.query.sort_by;

  if (!sortQuery) {
    return next();
  }

  const sortQueryFields = sortQuery.split(',').map((field) => {
    console.log('field: ', field)
    if (field.startsWith('-')) {
      return [field.substring(1).trim(), 'DESC'];
    }
    if (field.startsWith('+')) {
      return [field.substring(1).trim(), 'ASC'];
    }
    return [field.trim(), 'ASC'];
  }).filter((fieldAndSortOrder) => {
    const field = fieldAndSortOrder[0].trim();
    console.log('field: ', field);
    console.log('includes? :', sortableFields.includes(field));
    return sortableFields.includes(field);
  });

  console.log(typeof sortableFields);

  console.log(sortQueryFields);

  req.sortFields = sortQueryFields;

  next();
};
