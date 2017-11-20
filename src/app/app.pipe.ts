// 订单状态
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
// 提现明细
@Pipe({ name: 'setWithdrawStatus' })
export class FilterWithdrawStatusPipe implements PipeTransform {
  transform(param: string): string {
    switch(param) {
      case "0":
        return "失败";
      case "1":
        return "成功";
      case "3":
        return "拒绝";
      case "9":
        return "处理中";
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
        return "disabled";
      case null:
        return false;
    }
  }
}

@Pipe({ name: 'invalidAttrValueClass' })
export class InvalidAttrValueClassPipe implements PipeTransform {
  transform(invalidAttrValueClass: any): Boolean {
    switch(invalidAttrValueClass) {
      case "invalidAttrValue":
        return true;
      case null:
        return false;
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

@Pipe({ name: 'skuImage' })
export class SkuImagePipe implements PipeTransform {
  transform(skuImage: string): string {
    if (skuImage) {
      return "http://www.91topbaby.com/evercos/common/file/content/"+skuImage;
    }else {
      return "../../assets/image/nodata.png";
    }
    // switch(skuImage) {
    //   case "":
    //     return "../../assets/image/nodata.png";
    //   default:
    //     return "http://www.91topbaby.com/evercos/common/file/content/"+skuImage;
    // }
  }
}