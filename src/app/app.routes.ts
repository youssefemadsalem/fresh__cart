import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authguardGuard } from './core/guard/authguard.guard';

export const routes: Routes = [




  {
    path:'',
    component: AuthLayoutComponent,
    children: [
      {path:'' , redirectTo:'login' , pathMatch:'full'},
      { path: 'login', loadComponent:()=>import("../app/pages/login/login.component").then((c)=>c.LoginComponent), title: 'login' },
     
      { path: 'forget', loadComponent:()=>import("../app/pages/forgetpassword/forgetpassword.component").then((c)=>c.ForgetpasswordComponent), title: 'forget' },
      { path: 'verify', loadComponent:()=>import("../app/pages/verification/verification.component").then((c)=>c.VerificationComponent), title: 'write code' },
      { path: 'register', loadComponent: ()=>import("./pages/register/register.component").then((c)=>c.RegisterComponent), title: 'register' },
    ],
  },

  {
    path:'',
    component: MainLayoutComponent,
    canActivate:[authguardGuard],
    children: [
      {path:'home', component:HomeComponent },
      { path: 'products',  loadComponent: ()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent ), title: 'products' },
      { path: 'categories',  loadComponent: ()=>import("./pages/cato/cato.component").then((c)=>c.CatoComponent), title: 'categories' },
      { path: 'brands',  loadComponent: ()=>import("./pages/brands/brands.component").then((c)=>c.BrandsComponent), title: 'brands' },
      { path: 'cart',  loadComponent: ()=>import("./pages/cart/cart.component").then((c)=>c.CartComponent), title: 'cart' },
      { path: 'checkout/:c_id',  loadComponent: ()=>import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent), title: 'checkout' },
      { path: 'allorders',  loadComponent: ()=>import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent), title: 'allorders' },
      { path: 'wishlist',  loadComponent: ()=>import("./pages/wishlist/wishlist.component").then((c)=>c.WishlistComponent), title: 'wishlist' },
      { path: 'Prod-details/:p_id', loadComponent: ()=>import("./pages/products-details/products-details.component").then((c)=>c.ProductsDetailsComponent), title: 'details' },
      { path: 'brandsdetails/:b_id', loadComponent: ()=>import("./pages/brandsdetails/brandsdetails.component").then((c)=>c.BrandsdetailsComponent), title: 'brand products' },
      { path:'**' , loadComponent:()=>import("./pages/wlid/wlid.component").then((c)=>c.WlidComponent) ,title:'error'}
    ],
  },



  
];
