module.exports = (query) => {
    let filterStatus = [
        {
          name: 'Tất cả',
          btn_status: '',
          class: ''
        },
        {
          name: 'Hoạt động',
          btn_status: 'active',
          class: ''
        }, 
        {
          name: 'Dừng hoạt động',
          btn_status: 'inactive',
          class: ''
        }
      ]
    
      if(query.status){
        const index = filterStatus.findIndex((item) => item.btn_status == query.status);
        filterStatus[index].class = 'active';
      } else{
        // const index = filterStatus.findIndex((item) => item.btn_status == query.status);
        // filterStatus[index].class = 'active';
        filterStatus[0].class = 'active';
      }

    return filterStatus;
}