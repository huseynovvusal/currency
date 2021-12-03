class Currency {
  constructor() {
    this.url = `https://api.fastforex.io/fetch-one?from=Azn&to=Usd&api_key=`;
    this.key = "33c8d43806-5e1ceb9af5-r3hzp3";
  }

  async exchange(base, currency) {
    this.url = `https://api.fastforex.io/fetch-one?from=${base}&to=${currency}&api_key=`;
    let res = await fetch(this.url + this.key);
    let data = await res.json();

    return data;
  }
}
