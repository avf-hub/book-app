import {AbstractView} from "../../common/view.js";
import onChange from "on-change";
import {CardList} from "../../components/card_list/card-list.js";
import {Header} from "../../components/header/header.js";

export class FavoritesView extends AbstractView {

    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle("Мои книг");
    }

    destroy() {
        onChange.unsubscribe(this.appState);
    }

    appStateHook(path) {
        if (path === "favorites") {
            this.render();
        }
    }

    render() {
        const favorites = document.createElement("div");
        favorites.innerHTML = `<h1>Избранное - ${this.appState.favorites.length}</h1>`;
        favorites.append(new CardList(this.appState, {list:this.appState.favorites}).render());
        this.app.innerHTML = "";
        this.app.append(favorites);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}