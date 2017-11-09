import { PipeTransform, Pipe } from '@angular/core';
@Pipe({ name: 'setOrderStatus' })
export class FilterStatusPipe implements PipeTransform {
  transform(param: string): string {
    let value = "";
    switch(param) {
      case "0":
        return "待支付";
      case "1":
        return "已收货";
      case "2":
        return "已退货";
      case "3":
        return "已完成";
    }
  }
}