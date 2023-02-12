import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class MyCard extends LitElement {
  static styles = css`
    @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

    .controls {
      margin: 16px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .controls > .button {
      width: 20%;
    }

    .cards {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
      max-width: 300px;
      margin: 16px 16px;
      text-align: center;
      font-family: "Roboto Mono", monospace;
    }
    .card img {
      width: 100%;
    }
    .card p {
      padding: 16px;
    }
    .card > .button {
      display: none;
    }

    .button {
      background-color: #2895e8; /* Blue */
      border: none;
      color: white;
      padding: 8px 2vw;
      text-align: center;
      text-decoration: none;
      font-size: 14px;
      margin-bottom: 8px;
      cursor: pointer;
      border-radius: 4px;
      width: 25%;
      transform: scale(1);
      transition: 0.6s;
    }
    .button:hover,
    .button:focus {
      transform: scale(1.05);
      box-shadow: 0px 0px 48px 10px rgba(40, 149, 232, 0.7);
    }

    @media (min-width: 501px) and (max-width: 800px) {
      .card > .button {
        display: inline-block;
      }
    }
    @media (max-width: 500px) {
      .card {
        transform: scale(1.1);
      }
    }
  `;

  @property({ type: String }) card_title = "Placeholder Card";
  @property({ type: String }) card_description = "placeholder card description";

  //window.getComputedStyle(desc);
  //desc.getAttribute("style", "display: none");

  _new() {
    var clone = this.shadowRoot?.getElementById('card')?.cloneNode(true);
    if (clone) {
      (clone as Element).classList.add('dupecard');
      (clone as Element).children[3].addEventListener('click', this._details);
      this.shadowRoot?.getElementById('cards')?.appendChild(clone); 
    }
  }
  _title() {
    var dupecards = this.shadowRoot?.querySelectorAll('.dupecard');
    var index: string | null;
    var title: string | null;
    if (dupecards) {
      index = prompt("Enter the index of the CLONE you wish to edit")
      title = prompt("Enter new title for the card");
      dupecards[Number(index)].children[1].innerHTML = String(title);
    }
  }
  _bg() {
    var dupecards = this.shadowRoot?.querySelectorAll('.dupecard');
    var index: string | null;
    var color: string | null;
    if (dupecards) {
      index = prompt("Enter the index of the CLONE you wish to edit");
      color = prompt("Enter a color such as red, or green or white to return to default");
      this.shadowRoot?.querySelectorAll('.dupecard')[Number(index)].setAttribute("style", "background-color: " + color)
    }
  }
  _delete() {
    var dupecards = this.shadowRoot?.querySelectorAll('.dupecard');
    console.log(dupecards);
    if (dupecards) { this.shadowRoot?.getElementById('cards')?.removeChild(dupecards[dupecards.length - 1]); }
  }
  _details(event: Event) {
    if (event.target) {
      var _target = event.target as Element;
      var desc = _target.previousElementSibling;
      if (desc) { (window.getComputedStyle(desc).display == "none") ? desc.setAttribute("style", "display: ") : desc.setAttribute("style", "display: none"); }
    }
  }

  render() {
    return html`
      <div class="controls">
        <button @click=${this._new} class="button">add clone card</button>
        <button @click=${this._title} id="cardtitle" class="button">
          change clone title
        </button>
        <button @click=${this._bg} id="cardbg" class="button">
          toggle clone bg color
        </button>
        <button @click=${this._delete} id="carddel" class="button">
          delete newest clone
        </button>
      </div>
      <div id="cards" class="cards">
        <div id="card" class="card">
          <img
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            id="image"
          />
          <h2 id="title">${this.card_title}</h2>
          <p id="description">${this.card_description}</p>
          <button @click=${this._details} id="details" class="button">details</button>
        </div>
      </div>
    `;
  }
}
