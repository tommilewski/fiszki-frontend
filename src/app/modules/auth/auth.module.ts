import { NgModule } from "@angular/core";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SharedModule } from "../shared/shared.module";
import { CoreModule } from "../core/core.module";

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [SharedModule, AuthRoutingModule, CoreModule],
})
export class AuthModule {}
