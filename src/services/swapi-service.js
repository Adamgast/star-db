export default class SwapiService {
  apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    try {
      const res = await fetch(`${this.apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
      const result = await res.json();
      return result;
    } catch (err) {
      throw new Error('Error:', err);
    }
  }

  async getAllPeople() {
    const res = await this.getResource('/people/');
    return res.results.map(this.transformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}`);
    return this.transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource('/planets/');
    return res.results.map(this.transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}`);
    return this.transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource('/starships/');
    return res.results;
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}`);
  }

  // eslint-disable-next-line class-methods-use-this
  extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  transformPlanet = (planet) => ({
    id: this.extractId(planet),
    name: planet.name,
    population: planet.population,
    rotationPeriod: planet.rotation_period,
    diameter: planet.diameter,
  });

  transformPerson = (person) => ({
    id: this.extractId(person),
    name: person.name,
    gender: person.gender,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
  });
}
