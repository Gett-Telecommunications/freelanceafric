import { inject, Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { user, Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { I_CustomClaims, defaultCustomClaims } from '@freelanceafric/shared-shared';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  auth = inject(Auth);
  user$ = user(this.auth);

  claims: WritableSignal<I_CustomClaims> = signal(defaultCustomClaims);
  user = signal<User | null>(null);

  unsub = this.auth.onAuthStateChanged(async (user) => {
    this.user.set(user);
    if (!user) {
      this.claims.set(defaultCustomClaims);
    }
    const customClaims = (await user?.getIdTokenResult())?.claims;
    if (customClaims) {
      const _claims = { ...defaultCustomClaims, ...customClaims };
      this.claims.set(_claims);
    }
  });

  ngOnDestroy(): void {
    this.unsub();
  }
}
