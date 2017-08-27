import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {

  myPhoto: string;

  constructor(
	public navCtrl: NavController, 
	public navParams: NavParams,
	private actionSheet: ActionSheetController,
	private camera: Camera
	) {
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  choosePhoto() {
	let actionSheet = this.actionSheet.create({
		title: 'Choose Photo',
		buttons: [
			{
				text: 'Take Photo',
				handler: () => {
					this.takePhoto()
				}
			},
			{
				text: 'Choose Photo',
				handler: () => {
					this.takePhoto()
				}
			},			
			{
				text: 'Cancel',
				role: 'cancel'
			},
		]
	});
	actionSheet.present();
  }

  saveImage() {

  }

private takePhoto() {
	const options: CameraOptions = {
		quality: 100,
		mediaType: this.camera.MediaType.PICTURE,
		sourceType: this.camera.PictureSourceType.CAMERA,
		destinationType: this.camera.DestinationType.FILE_URI,
		encodingType: this.camera.EncodingType.JPEG
	};
	
	this.camera.getPicture(options).then((imageData) => {
		console.log(imageData);
		this.myPhoto = imageData;
	})
	.catch ((err) => {
		console.log(err);
	})
}

}
