import { PipeTransform, Pipe } from '@angular/core';

// 订单状态的转换
@Pipe({ name: 'setOrderStatus' })
export class FilterStatusPipe implements PipeTransform {
  transform(param: string): string {
    let value = "";
    switch(param) {
      case "0":
        return "待支付";
      case "1":
        return "已支付";
      case "2":
        return "已发货";
      case "3":
        return "已收货";
      case "4":
        return "已取消";
      case "6":
        return "取消中";
      case "C":
        return "已完成"
    }
  }
}

// 退货订单的状态转换
@Pipe({ name: 'setReturnOrderStatus' })
export class FilterReturnStatusPipe implements PipeTransform {
  transform(param: string): string {
    let value = "";
    switch(param) {
      case "0":
        return "申请审核中";
      case "1":
        return "申请已同意";
      case "2":
        return "商家已收货";
      case "3":
        return "申请已完成";
      case "4":
        return "申请拒绝";
    }
  }
}

// 取消订单的状态转换
@Pipe({ name: 'setCancelOrderStatus' })
export class FilterCancelStatusPipe implements PipeTransform {
  transform(param: string): string {
    let value = "";
    switch(param) {
      case "0":
        return "未处理"
      case "1":
        return "同意"
      case "2":
        return "拒绝"
      case "3":
        return "已完成"
    }
  }
}
