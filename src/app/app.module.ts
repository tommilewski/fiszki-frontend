import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "./modules/core/core.module";
import { EffectsModule } from "@ngrx/effects";
import { AuthModule } from "./modules/auth/auth.module";
import { IndexCardsModule } from "./modules/index-cards/index-cards.module";
import { authReducer } from "./modules/auth/store/auth.reducer";
import { HttpClientModule } from "@angular/common/http";
import { AuthEffects } from "./modules/auth/store/auth.effects";
import { NotifierModule, NotifierOptions } from "angular-notifier";

const customNotifier: NotifierOptions = {
    position: {
        horizontal: {
            position: "right",
            distance: 10,
        },
        vertical: {
            position: "top",
            distance: 80,
            gap: 10,
        },
    },
    theme: "material",
    behaviour: {
        autoHide: 1500,
        onClick: false,
        onMouseover: "pauseAutoHide",
        showDismissButton: true,
        stacking: 4,
    },
    animations: {
        enabled: true,
        show: {
            preset: "slide",
            speed: 300,
            easing: "ease",
        },
        hide: {
            preset: "fade",
            speed: 300,
            easing: "ease",
            offset: 50,
        },
        shift: {
            speed: 300,
            easing: "ease",
        },
        overlap: 150,
    },
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AuthModule,
        IndexCardsModule,
        CoreModule,
        HttpClientModule,
        StoreModule.forRoot({ auth: authReducer }),
        EffectsModule.forRoot([AuthEffects]),
        NotifierModule.withConfig(customNotifier),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
