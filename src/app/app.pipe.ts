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

@Pipe({ name: 'setGiftTypeClass' })
export class FilterGiftTypeClassPipe implements PipeTransform {
  transform(giftType: string, expoent: string): string {
    if (giftType=='0' && expoent=='2'){
      return "unstart";
    }else if (giftType=='0' && expoent=='3'){
      return "success";
    }else if (giftType=='1') {
      return "unstart";
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