import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { unAuthGuard } from "../core/guards/unAuthGuard";

const routes: Routes = [
    {
        path: "logowanie",
        component: LoginComponent,
        canActivate: [unAuthGuard],
    },
    {
        path: "rejestracja",
        component: RegisterComponent,
        canActivate: [unAuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
