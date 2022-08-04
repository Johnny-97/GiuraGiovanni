import { Attribute, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent{

  @Input() disabled = false;

  onClick(event:any){
    if(this.disabled){
      event.stopPropagation();
    }
  }

  @Output() click= new EventEmitter();

  private types = {
    normal: 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded',
    danger: 'bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded',
    info: 'bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded',
  };
  private disabledButton = 'bg-transparent text-gray-700 font-semibold py-2 px-4 border border-gray-500 rounded cursor-not-allowed';

  constructor(@Attribute('class') private clss: string, @Attribute('type') private type: ButtonStyle) {}

  getClass(){
    if(this.disabled){
      return this.disabledButton + ' '+ this.clss;
    }
    let index = -1;
      Object.keys(this.types).forEach((value, idx)=>{
        if(value == this.type){
          index= idx;
        }
      });
      return 'gg-btn '+ Object.values(this.types)[index] + ' '+this.clss;
  }
}

type ButtonStyle= 'normal' | 'danger' | 'info'
