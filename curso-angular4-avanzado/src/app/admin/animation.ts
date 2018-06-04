import { animate, state, style, transition, trigger } from '@angular/animations'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//animacions de angular

export const fadeLateral =
    trigger('fadeLateral',[
        
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-20%)'
                //transform: 'translateY(-30%)',
                
            }),
            animate('300ms ease-in',
            style({
                opacity: 1,
                transform: 'translateY(0)'
            }))
        ])
       
      
    ]);