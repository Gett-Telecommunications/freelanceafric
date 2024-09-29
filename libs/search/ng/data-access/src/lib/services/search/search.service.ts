import { Injectable, inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, limit, orderBy, startAt, endAt } from '@angular/fire/firestore';
import { T_SearchFilterOptions } from '@freelanceafric/search-shared';
import { E_FirestoreCollections } from '@freelanceafric/shared-shared';
import { Observable, from, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  auth = inject(Auth);
  firestore = inject(Firestore);
  user$ = user(this.auth);

  gigsCollection = collection(this.firestore, E_FirestoreCollections.GIGS);
  sellerProfilesCollection = collection(this.firestore, E_FirestoreCollections.SELLER_PROFILES);
  sellerCareersCollection = collection(this.firestore, E_FirestoreCollections.SELLER_CAREERS);

  searchAll(term: string, filter: T_SearchFilterOptions): Observable<I_SearchResult[]> {
    console.log('searchAll', term, filter);

    return combineLatest([
      filter === 'all' || filter === 'freelancers' ? this.searchFreelancers(term) : from([[]]),
      filter === 'all' || filter === 'gigs' ? this.searchGigs(term) : from([[]]),
    ]).pipe(
      map(([freelancers, gigs]) => [...freelancers, ...gigs]),
      map((results) =>
        results.sort((a, b) => this.relevanceScore(b, term) - this.relevanceScore(a, term)).slice(0, 10),
      ),
    );
  }

  private searchFreelancers(term: string): Observable<I_SearchResult[]> {
    console.log('searchFreelancers', term);

    const profilesQuery = query(
      this.sellerProfilesCollection,
      where('status', '==', 'active'),
      orderBy('displayName'),
      startAt(term),
      endAt(term + '\uf8ff'),
      limit(10),
    );

    const careersQuery = query(
      this.sellerCareersCollection,
      where('status', '==', 'active'),
      orderBy('occupation'),
      startAt(term),
      endAt(term + '\uf8ff'),
      limit(10),
    );

    return combineLatest([from(getDocs(profilesQuery)), from(getDocs(careersQuery))]).pipe(
      map(([profilesSnapshot, careersSnapshot]) => {
        const profiles = profilesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: 'freelancer' as const,
        }));
        console.log('profiles', profiles);

        const careers = careersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'freelancer' as const }));
        return [...profiles, ...careers] as I_SearchResult[];
      }),
    );
  }

  private searchGigs(term: string): Observable<I_SearchResult[]> {
    const gigsQuery = query(
      this.gigsCollection,
      where('status', '==', 'active'),
      orderBy('title'),
      startAt(term),
      endAt(term + '\uf8ff'),
      limit(10),
    );

    return from(getDocs(gigsQuery)).pipe(
      map(
        (snapshot) =>
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: 'gig' as const })) as I_SearchResult[],
      ),
    );
  }

  private relevanceScore(item: I_SearchResult, term: string): number {
    const searchableText = (item.displayName || item.occupation || item.title || '').toLowerCase();
    return searchableText.split(term.toLowerCase()).length - 1;
  }
}

export interface I_SearchResult {
  id: string;
  type: 'freelancer' | 'gig';
  title?: string;
  displayName?: string;
  occupation?: string;
  // Add other relevant fields
}
