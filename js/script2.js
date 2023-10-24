let accordionBtn = document.querySelectorAll('.sidebar-menu-category-btn');
let accordion = document.querySelectorAll('.sidebar-menu-category-ul');
let plus = document.querySelectorAll('.fa-plus');
let minus = document.querySelectorAll('.fa-minus');
let right = document.querySelectorAll('.right');
let bottom = document.querySelectorAll('.bottom');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');
    
    for (let j = 0; j < accordion.length; j++) {

      if (clickedBtn) break;

      if (minus[j] && plus[j] && bottom[j] && right[j]) {
        minus[j].style.display = "none";
        plus[j].style.display = "block";
        bottom[j].style.display = "none";
        right[j].style.display = "block";
      }
      

    }
    
    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');
    
    // تحديث خاصيتي العرض لأيقونات الناقص والزائد بناءً على حالة الاكورديون المفعلة
    if (this.nextElementSibling.classList.contains('active')) {
      minus[i].style.display = "block"; // تحديث خاصية العرض لأيقونة الناقص
      plus[i].style.display = "none"; // تحديث خاصية العرض لأيقونة الزائد
      bottom[i].style.display = "block"; // تحديث خاصية العرض لأيقونة الناقص
      right[i].style.display = "none"; // تحديث خاصية العرض لأيقونة الزائد
    } else {
      minus[i].style.display = "none"; // تحديث خاصية العرض لأيقونة الناقص
      plus[i].style.display = "block"; // تحديث خاصية العرض لأيقونة الزائد
      bottom[i].style.display = "none"; // تحديث خاصية العرض لأيقونة الناقص
      right[i].style.display = "block"; // تحديث خاصية العرض لأيقونة الزائد
    }

  });

}


const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.style.display = "none"; // تحديث خاصية العرض لأيقونة الناقص

});

