import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.css']
})
export class SearchPropertyComponent implements OnInit {
  
  propertySearchForm: FormGroup;

  constructor(private currentRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.propertySearchForm = this.formBuilder.group({
      state: ['RJ'],
      city: ['Rio de Janeiro'],
      neighborhood: [0],
      typology: [0],
      price: [0],
      rooms: [0],
      parking_spot: [0],
      incorporators: [0],
    });
   }

  ngOnInit(): void {
    console.log(this.currentRoute.snapshot.params['property-parameters'])
    this.loadMap();
  }

  getProperties() {

  }

  loadMap() {
    this.loader.loadCallback(e => {
      if (e) {
        console.log(e);
      } else {
        new google.maps.Map(document.getElementById("map") as HTMLAnchorElement, this.mapOptions);
      }
    });
  }

  loader = new Loader({
    apiKey: "",
    version: "weekly",
    libraries: ["places"]
  });
  
  mapOptions = {
    center: {
      lat: -22.983781298015188,
      lng: -43.3612144413545
    },
    zoom: 11
  };

}
