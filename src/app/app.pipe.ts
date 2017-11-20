import { PipeTransform, Pipe, transition } from '@angular/core';

// 订单状态的转换
@Pipe({ name: 'setOrderStatus' })
export class FilterStatusPipe implements PipeTransform {
  transform(param: string): any {
    switch(param) {
      case "0":
        return {
          status: "待支付",
          pass: false,
          audit: true
        };
      case "1":
        return {
          status: "已支付",
          pass: true,
          audit: false
        };
      case "2":
        return {
          status: "已发货",
          pass: true,
          audit: false
        };
      case "3":
        return {
          status: "已收货",
          pass: true,
          audit: false
        };
      case "4":
        return {
          status: "已取消",
          pass: false,
          audit: true
        };
      case "6":
        return {
          status: "取消中",
          pass: true,
          audit: false
        };
      case "C":
        return {
          status: "已完成",
          pass: true,
          audit: false
        }
    }
  }
}

// 退货订单的状态转换
@Pipe({ name: 'setReturnOrderStatus' })
export class FilterReturnStatusPipe implements PipeTransform {
  transform(param: string): any {
    let value = "";
    switch(param) {
      case "0":
        return {
          status: "申请审核中",
          pass: true,
          audit: false
        };
      case "1":
        return {
          status: "申请已同意",
          pass: true,
          audit: false
        };
      case "2":
        return {
          status: "商家已收货",
          pass: true,
          audit: false
        };
      case "3":
        return {
          status: "申请已完成",
          pass: true,
          audit: false
        };
      case "4":
        return {
          status: "申请拒绝",
          pass: false,
          audit: true
        };
    }
  }
}

// 取消订单的状态转换
@Pipe({ name: 'setCancelOrderStatus' })
export class FilterCancelStatusPipe implements PipeTransform {
  transform(param: string): any {
    let value = "";
    switch(param) {
      case "0":
        return {
          status: "未处理",
          pass: false,
          audit: true
        }
      case "1":
        return {
          status: "同意",
          pass: true,
          audit: false
        }
      case "2":
        return {
          status: "拒绝",
          pass: false,
          audit: true
        }
      case "3":
        return {
          status: "已完成",
          pass: true,
          audit: false
        }
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
  }
}

@Pipe({ name: 'productSkuDTOImage' })
export class ProductSkuDTOImagePipe implements PipeTransform {
  transform(productSkuDTOImage: string): string {
    if (productSkuDTOImage) {
      return "http://www.91topbaby.com/evercos/common/file/content/"+productSkuDTOImage;
    }else {
      return "../../assets/image/nodata.png";
    }
  }
}
