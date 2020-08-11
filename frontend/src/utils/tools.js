export const getParameter = param => {  // 获取url中参数
  const query = window.location.href;
  const iLen = param.length;
  let iStart = query.indexOf(param);
  if (iStart === -1) {
    return '';
  }
  iStart += iLen + 1;
  const iEnd = query.indexOf('&', iStart);
  if (iEnd === -1) {
    return query.substring(iStart);
  }
  return decodeURI(query.substring(iStart, iEnd), 'utf-8');
};

export const trimEmpty = arr => {  //数组去空
  const newArr = [];
  arr.forEach(item => {
    if (item !== '') {
      newArr.push(item)
    }
  })
  return newArr;
}

export const exportExcel = (data, title) => {  // 导出表格
  const link = document.createElement('a');
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `${title}.xls`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}