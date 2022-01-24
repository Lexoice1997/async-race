const getPageCount = (totalCount: number, limit: number): number => {
  return Math.ceil(totalCount / limit);
};

const getPagesArr = (totalPages: number): Array<number> => {
  const result: Array<number> = [];
  for (let i = 0; i < totalPages; i += 1) {
    result.push(i + 1);
  }

  return result;
}

export {getPageCount, getPagesArr};
