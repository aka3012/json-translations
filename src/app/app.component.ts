import { Component } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'localization-example';

  greeting = "not translated mwhahahahaha cake"

  constructor(client: HttpClient) {
    client.get("assets/i18n/ar.json").subscribe((v: any)  => {
      loadTranslations(v);
    });
    // loadTranslations({
    //   "World": "مرحبا"
    // });

  }
  
  public onClick(){
    this.greeting = this.translate("World", `Missing Translation: ${"World"}`);
    // Inside snackbar
    // i18nService.translate(messageFromServer)
  }

  // public translate(key: string): string {
  //   return $localize(new DynamicTemplateStringsArray([`:@@${key}:`]));
  // }

  public translate(key: string, fallback?: string): string {
    return $localize(new DynamicTemplateStringsArray([`:@@${key}:${fallback}`]));
  }
}

class DynamicTemplateStringsArray extends Array<string> implements TemplateStringsArray{
  /**
   *
   */
  constructor(items: string[]) {
    super();
    this.push(... items);
    this.raw = this;  
  }
  raw: readonly string[];
  
}
