import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class getLocation {

  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor() { }

  // Create an Observable that will start listening to geolocation updates
  // when a consumer subscribes.
  public locations = new Observable <GeolocationPosition> ((observer) => {
    let watchId: number;

    // Simple geolocation API check provides values to publish
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
        observer.next(position);
      }, (error: GeolocationPositionError) => {
        observer.error(error);
      }, this.options);
    } else {
      observer.error('Geolocation not available');
    }

    // When the consumer unsubscribes, clean up data ready for next subscription.
    return {
      unsubscribe() {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  });

}
