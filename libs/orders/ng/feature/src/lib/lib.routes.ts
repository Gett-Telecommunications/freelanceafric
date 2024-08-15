import { Route } from '@angular/router';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';

export const ordersFeatureRoutes: Route[] = [{ path: 'r_orderId', component: OrderDetailsPageComponent }];
