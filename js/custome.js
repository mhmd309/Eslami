$(function () {
  $('.quantity .number').click(function () {
    var personIndex = $(this).index(),
      personThis = $(this).parent().find('input'),
      personCount = personThis.val(),
      personMin = personThis.attr('data-min');
    if (personIndex == 0) {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
      }
    }
    if (personCount == "0") {
      personThis.addClass('active').fadeOut(1500);
      $(this).fadeOut(500);
    }
  });
});
// Quran Kareem
let surahsContainer = document.querySelector('.name-surah');
getSurahs();

function getSurahs() {
  // fetch surahs names
  fetch("http://api.alquran.cloud/v1/meta")
    .then(Response => Response.json())
    .then(data => {
      let surahs = data.data.surahs.references;
      let numberOfSurahs = 114;
      surahsContainer.innerHTML = "";
      for (i = 0; i < numberOfSurahs; i++) {
        surahsContainer.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="surah mt-2 mb-2">
            <p class="m-0 mb-1">${surahs[i].number}</p>
            <p class="m-0 mb-1">${surahs[i].name}</p>
            <p class="m-0">${surahs[i].englishName}</p>
          </div>
        </div>`
      }
      let surahsTitles = document.querySelectorAll('.surah');
      let popup = document.querySelector('.surah-pop');
      let ayatContiner = document.querySelector('.ayat');
      surahsTitles.forEach((title, index) => {
        title.addEventListener('click', () => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then(Response => Response.json())
            .then(data => {
              ayatContiner.innerHTML = "";
              let ayat = data.data.ayahs;
              ayat.forEach(aya => {
                popup.classList.add('active');
                ayatContiner.innerHTML += `
                  <p class="m-0">${aya.text} - (${aya.numberInSurah})</p>
                `
              })
            })
        })
      })
      let closePopup = document.querySelector('.close-pop');
      closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
      })
    })
}
