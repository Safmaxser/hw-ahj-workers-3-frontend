import "./newsletter.css";
import Stream from "./stream";

function dateNowToStr(created) {
  const date = new Date(created);
  const strTime = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const strDate = date.toLocaleDateString("ru-RU");
  return strTime + " " + strDate;
}

export default class Newsletter {
  constructor(container, urlBase) {
    this.container = this.bindToDOM(container);
    this.urlBase = urlBase;
    this.newsletter;
    this.newsletterContainer;
    this.newsletterList;
    this.newsletterNotice;
    this.newsletterBtnUpdate;
    this.createBaseDom();
    this.stream = new Stream(this.urlBase, this.newsletterBtnUpdate);
    this.init();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("Container is not HTMLElement!");
    }
    return container;
  }

  init() {
    this.createBlockSample();
    this.subscriptionInit();
    this.newsletterBtnUpdate.addEventListener("click", () => {
      this.newsletter.classList.add("wait");
    });
  }

  subscriptionInit() {
    this.stream.addObserver(this.addingNews.bind(this));
  }

  addingNews(data) {
    if (data.status === "ok") {
      this.interfacePreparation(true);
      for (const news of data.newslist) {
        this.createItem(news);
      }
    } else {
      this.interfacePreparation(false);
    }
  }

  interfacePreparation(flagOK) {
    this.newsletter.classList.remove("wait");
    if (flagOK) {
      this.newsletterList.innerHTML = "";
      this.newsletterContainer.classList.remove("transparent");
      this.newsletterNotice.classList.add("hidden");
    } else {
      this.newsletterContainer.classList.add("transparent");
      this.newsletterNotice.classList.remove("hidden");
    }
  }

  createItem(news) {
    this.newsletterList.insertAdjacentHTML(
      "beforeend",
      `
      <div class="newsletter__item">
        <div class="newsletter__created">
          ${dateNowToStr(news.created)}          
        </div>
        <div class="newsletter__content">
          <div class="newsletter__img-block">
            <img class="newsletter__img" src="${news.image}" alt="картинка блока">
          </div>
          <div class="newsletter__text">
            ${news.title}
          </div>
        </div>
      </div>
      `,
    );
  }

  createBlockSample() {
    this.newsletterList.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      this.createItemSample();
    }
  }

  createItemSample() {
    this.newsletterList.insertAdjacentHTML(
      "beforeend",
      `
      <div class="newsletter__item">
        <div class="newsletter__created sample">
        </div>
        <div class="newsletter__content">
          <div class="newsletter__img-block sample">            
          </div>
          <div class="newsletter__text">
            <div class="newsletter__str sample"></div>
            <div class="newsletter__str sample"></div>
          </div>
        </div>
      </div>
      `,
    );
  }

  createBaseDom() {
    this.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="newsletter wait">
        <div class="newsletter__container">
          <div class="newsletter__head">
            <h2 class="newsletter__title">
              Новости мира кино
            </h2>
            <button class="newsletter__btn-update" type="button">
              Обновить
            </button>
          </div>
          <div class="newsletter__list">
          </div>
        </div>
        <div class="newsletter__notice hidden">
          Не удалось загрузить данные<br>
          Проверьте подключение и обновите страницу
        </div>
      </div>
      `,
    );
    this.newsletter = this.container.querySelector(".newsletter");
    this.newsletterContainer = this.newsletter.querySelector(
      ".newsletter__container",
    );
    this.newsletterList =
      this.newsletterContainer.querySelector(".newsletter__list");
    this.newsletterNotice = this.newsletter.querySelector(
      ".newsletter__notice",
    );
    this.newsletterBtnUpdate = this.newsletter.querySelector(
      ".newsletter__btn-update",
    );
  }
}
