import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { RouterLink } from "@angular/router";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [HeaderComponent, SpinnerComponent],
    imports: [SharedModule, RouterLink],
    exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
