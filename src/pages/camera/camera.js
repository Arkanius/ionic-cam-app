var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { SQLite } from '@ionic-native/sqlite';
import { CameraListPage } from '../pages/camera-list/camera-list';
/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CameraPage = (function () {
    function CameraPage(navCtrl, navParams, actionSheet, camera, filePath, platform, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheet = actionSheet;
        this.camera = camera;
        this.filePath = filePath;
        this.platform = platform;
        this.sqlite = sqlite;
    }
    CameraPage.prototype.ngOnInit = function () {
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) {
            db.executeSql('CREATE TABLE photos (url VARCHAR(250))', {})
                .then(console.log('created'))
                .catch(function (err) { return console.log(err); });
        });
    };
    CameraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CameraPage');
    };
    CameraPage.prototype.choosePhoto = function () {
        var _this = this;
        var actionSheet = this.actionSheet.create({
            title: 'Choose Photo',
            buttons: [
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.takePhoto(_this.camera.PictureSourceType.CAMERA, _this.camera.MediaType.PICTURE);
                    }
                },
                {
                    text: 'Choose Photo',
                    handler: function () {
                        _this.takePhoto(_this.camera.PictureSourceType.PHOTOLIBRARY, _this.camera.MediaType.PICTURE);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
            ]
        });
        actionSheet.present();
    };
    CameraPage.prototype.saveImage = function () {
        var _this = this;
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        })
            .then(function (db) { return ; })
            .then(function (db) {
            _this.navCtrl.push(CameraListPage);
        })
            .catch(function (e) { return console.log(e); });
    };
    CameraPage.prototype.takePhoto = function (source, mediaType) {
        var _this = this;
        if (source === void 0) { source = 1; }
        if (mediaType === void 0) { mediaType = 0; }
        var options = {
            quality: 100,
            mediaType: mediaType,
            sourceType: source,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log(imageData);
            if (source == 0 && _this.platform.is('android')) {
                _this.filePath.resolveNativePath(imageData).then(function (filePath) {
                    _this.myPhoto = filePath;
                })
                    .catch(function (err) { return console.log(err); });
            }
            else {
                _this.myPhoto = imageData;
            } //
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    return CameraPage;
}());
CameraPage = __decorate([
    Component({
        selector: 'page-camera',
        templateUrl: 'camera.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ActionSheetController,
        Camera,
        FilePath,
        Platform,
        SQLite])
], CameraPage);
export { CameraPage };
//# sourceMappingURL=camera.js.map