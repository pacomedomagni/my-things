import { BehaviorSubject, Observable } from "rxjs";

import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LoadingService {
	private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isLoading$: Observable<boolean> = this._isLoading$.asObservable();

	public startLoading(): void {
		this._isLoading$.next(true);
	}

	public stopLoading(): void {
		this._isLoading$.next(false);
	}

	public toggleLoading(): void {
		const toggle = !this._isLoading$.getValue();
		this._isLoading$.next(toggle);
	}

}
