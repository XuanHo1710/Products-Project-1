const btnStatus = document.querySelectorAll('[btn-status]');
btnStatus.forEach((item) => {
    item.addEventListener('click', () => {
        const getStatus = item.getAttribute('btn-status');
        let url = new URL(window.location.href);
        if(getStatus){
            url.searchParams.set('status', getStatus);
        } else{
            url.searchParams.delete('status');
        }
        window.location.href = url.href;
    })
})

const formSearch = document.querySelector("#form-search");
if(formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if(keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    const typeChange = e.target.elements.type.value;

    if(typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");

      if(!isConfirm) {
        return;
      }
    }

    if(inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputsChecked.forEach(input => {
        const id = input.value;
        if (typeChange == "change-position") {
            const position = input
              .closest("tr")
              .querySelector("input[name='position']").value;

            ids.push(`${id}-${position}`);
            } else {
              ids.push(id);
            }
        
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
// End Form Change Multi


// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDelete = document.querySelector("#form-delete");
if (buttonDelete.length > 0){
  buttonDelete.forEach(btn => {
      btn.addEventListener('click', () => {
        const isConfirm = confirm("Bạn có chắc muốn xóa nó không ?");
        if(isConfirm){
          const id = btn.getAttribute("data-id");
          const path = formDelete.getAttribute("data-path");
          const action = `${path}/${id}?_method=DELETE`;
          formDelete.action = action;
          formDelete.submit();
        }
      })
  })
}
// End Delete Item

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  const deleteImage = document.querySelector("[delete-image]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file) {
      if(deleteImage.classList.length > 0)
        deleteImage.classList.remove('d-none');
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
  deleteImage.addEventListener('click', (event) => {
    event.target.classList.add('d-none');
    uploadImagePreview.src = "";
    uploadImageInput.value = "";
  })
}
// End Upload Image


//Sort

const sort = document.querySelector("[sort]");
if(sort){
  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  const url = new URL(window.location.href);

  // Sort Select
  sortSelect.addEventListener('change', (e) => {
    const [sortKey, sortValue] = e.target.value.split('-');
    url.searchParams.set('sortKey', sortKey);
    url.searchParams.set('sortValue', sortValue);
    window.location.href = url.href;
  });
  // End Sort Select

  //Clear Sort
  sortClear.addEventListener('click', (e) => {
    url.searchParams.delete('sortKey');
    url.searchParams.delete('sortValue');
    window.location.href = url.href;
  });
  //End Clear Sort

  // Add select for option
  const sortKey = url.searchParams.get('sortKey');
  const sortValue = url.searchParams.get('sortValue');
  const selectValue = `${sortKey}-${sortValue}`;
  
  if(sortKey && sortValue){
      const optionSelect = document.querySelector(`option[value=${selectValue}]`);
      optionSelect.selected = true;
  }
  //End add select for option
}



//End Sort
