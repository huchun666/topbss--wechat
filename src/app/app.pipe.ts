import { PipeTransform, Pipe } from '@angular/core';
@Pipe({ name: 'setOrderStatus' })
export class FilterStatusPipe implements PipeTransform {
  transform(param: string): string {
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

@Pipe({ name: 'setGiftType' })
export class FilterGiftTypePipe implements PipeTransform {
  transform(giftType: string, expoent: string): string {
    if (giftType=='0' && expoent=='2'){
      return "预约兑换";
    }else if (giftType=='0' && expoent=='3'){
      return "预约成功";
    }else if (giftType=='1') {
      return "到店兑换";
    }
  }
}

@Pipe({ name: 'setHandleGiftType' })
export class FilterHandleGiftTypePipe implements PipeTransform {
  transform(giftType: string): string {
    switch(giftType) {
      case "0":
        return "预约兑换";
      case "1":
        return "到店兑换";
    }
  }
}

@Pipe({ name: 'isOrIsnotInvalidAttrValue' })
export class IsOrIsnotInvalidAttrValuePipe implements PipeTransform {
  transform(invalidAttrValue: any): any {
    switch(invalidAttrValue) {
      case "invalidAttrValue":
        return false;
      case null:
        return "disabled";
    }
  }
}

@Pipe({ name: 'invalidAttrValueClass' })
export class InvalidAttrValueClassPipe implements PipeTransform {
  transform(invalidAttrValueClass: any): Boolean {
    switch(invalidAttrValueClass) {
      case "invalidAttrValue":
        return false;
      case null:
        return true;
    }
  }
}

@Pipe({ name: 'changeGray' })
export class ChangeGrayPipe implements PipeTransform {
  transform(count: number): Boolean {
    switch(count) {
      case 1:
        return true;
      default:
        return false;
    }
  }
}