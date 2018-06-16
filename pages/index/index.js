//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    attrList: [
      {
        attrName: '空调类型',                    // 规格名称
        attrType: '1',                          // 规格类型
        id: '915859d5376a46d5834f27edcf3dc114', // 规格id
        attr: [                                 // 规格属性列表
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',   // 规格id
            id: '5',                                           // 此规格属性id
            attributeValue: '正1匹',                           // 属性名称
            enable: false,                                     // 是否可选
            select: false,                                     // 是否选择
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '6',
            attributeValue: '正1.5匹',
            enable: false,
            select: false,
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '7',
            attributeValue: '小1.5匹',
            enable: false,
            select: false,
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '8',
            attributeValue: '正2匹',
            enable: false,
            select: false,
          },
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            id: '9',
            attributeValue: '正3匹',
            enable: false,
            select: false,
          },
        ],
      },
      {
        attrName: '颜色',
        attrType: 'text',
        id: 'e95a7777c08c41769d5207c075a25ddc',
        attr: [
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            id: '236bbb1d5c654e9cb3a1493a2bb4785b',
            attributeValue: '红色',
            enable: false,
            select: false,
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            id: 'bc6aa3592ab94ad9bd81a319a72c25fe',
            attributeValue: '白色',
            enable: false,
            select: false,
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            id: 'f52cf21afd2c42b68cfc3f9c601458f7',
            attributeValue: '黑色',
            enable: false,
            select: false,
          },
        ],
      },
    ], // 清单列表
    skuBeanList: [
      {
        name: '正1匹_红色_', // 名称
        price: '1002',      // 价钱
        count: 100,         // 库存量
        attributes: [
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114', // 规格id
            attributeValId: '5',                             // 属性id
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            attributeValId: '236bbb1d5c654e9cb3a1493a2bb4785b',
          },
        ]
      },
      {
        name: '正1匹_白色_',
        price: '1002',
        count: 100,
        attributes: [
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            attributeValId: '5',
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            attributeValId: 'bc6aa3592ab94ad9bd81a319a72c25fe',
          }
        ]
      },
      {
        name: '正1.5匹_红色_',
        price: '1002',
        count: 100,
        attributes: [
          {
            attributeId: '915859d5376a46d5834f27edcf3dc114',
            attributeValId: '6',
          },
          {
            attributeId: 'e95a7777c08c41769d5207c075a25ddc',
            attributeValId: '236bbb1d5c654e9cb3a1493a2bb4785b',
          }
        ]
      },
      // {
      //   name: '正1.5匹_白色_',
      //   price: '1002',
      //   count: 100,
      //   attributes: [
      //     {
      //       attributeId: '915859d5376a46d5834f27edcf3dc114',
      //       attributeValId: '6',
      //     },
      //     {
      //       attributeId: 'e95a7777c08c41769d5207c075a25ddc',
      //       attributeValId: 'bc6aa3592ab94ad9bd81a319a72c25fe',
      //     }
      //   ]
      // },
    ], // 存库列表

    infoText: "请点击获取属性，获取详细",
  },

  /**
   * Sku核心算法
   * 根据所有出当前类别之外的选择 判断按钮的enable ？ false or true
   */
  onData: function () {

    var attrListIn = this.data.attrList;

    console.log(this.data.attrList, "待扫描 列表清单");
    console.log(this.data.skuBeanList, "待扫描 库存清单");

    for (var i = 0; i < attrListIn.length; i++) {
      var attrListBig = attrListIn[i];

      //当前类别之外的选择列表
      var attrsOtherSelect = [];
      for (var j = 0; j < attrListIn.length; j++) {
        var attrListSmall = attrListIn[j];
        if (attrListSmall.id != attrListBig.id) {
          for (var k = 0; k < attrListSmall.attr.length; k++) {
            var attrListSmallAttr = attrListSmall.attr[k];
            if (attrListSmallAttr.enable && attrListSmallAttr.select) {
              attrsOtherSelect.push(attrListSmallAttr);
            }
          }
        }
      }

      var enableIds = [];

      var skuBeanListIn = this.data.skuBeanList;

      for (var z = 0; z < skuBeanListIn.length; z++) {
        var ism = true;
        var skuBean = skuBeanListIn[z];

        for (var j = 0; j < attrsOtherSelect.length; j++) {
          var enable = false;
          for (var k = 0; k < skuBean.attributes.length; k++) {

            var goodAttrBean = skuBean.attributes[k];

            if (attrsOtherSelect[j].attributeId == goodAttrBean.attributeId
              && attrsOtherSelect[j].id == goodAttrBean.attributeValId) {
              enable = true;
              break;
            }
          }
          ism = enable && ism;
        }

        if (ism) {
          for (var o = 0; o < skuBean.attributes.length; o++) {
            var goodAttrBean = skuBean.attributes[o];

            if (attrListBig.id == goodAttrBean.attributeId) {
              enableIds.push(goodAttrBean.attributeValId);
            }
          }
        }
      }

      console.log(enableIds, "sku算法 扫描结果");

      var integers = enableIds;
      for (var s = 0; s < attrListBig.attr.length; s++) {
        var attrItem = attrListBig.attr[s];

        attrItem.enable = integers.indexOf(attrItem.id) != -1;

      }
    }

    // 重新赋值
    this.setData({
      attrList: attrListIn,
      skuBeanList: skuBeanListIn
    })
  },

  /**
   * 规格属性点击事件
   */
  onChangeShowState: function (event) {
    var listItem = this.data.attrList;
    var items = listItem[event.currentTarget.dataset.idx];
    var item = items.attr[event.currentTarget.dataset.index];

    if (!item.enable) {
      return;
    }

    var select = !item.select;

    for (var i = 0; i < items.attr.length; i++) {
      items.attr[i].select = false;
    }

    item.select = select;

    // 获取点击属性列表
    var canGetInfo = [];
    for (var skuIndex = 0; skuIndex < listItem.length; skuIndex++) {
      for (var skuIndexIn = 0; skuIndexIn < listItem[skuIndex].attr.length; skuIndexIn++) {
        if (listItem[skuIndex].attr[skuIndexIn].enable && listItem[skuIndex].attr[skuIndexIn].select) {
          canGetInfo.push(listItem[skuIndex].attr[skuIndexIn]);
        }
      }
    }

    console.log(canGetInfo, "目前点击的属性");

    var canGetInfoLog = "";

    var skuBeanList = this.data.skuBeanList;

    var haveSkuBean = [];
    // 对应库存清单扫描
    for (var skuBeanIndex = 0; skuBeanIndex < skuBeanList.length; skuBeanIndex++) {
      var iListCount = 0;
      for (var skuBeanIndexIn = 0; skuBeanIndexIn < skuBeanList[skuBeanIndex].attributes.length; skuBeanIndexIn++) {
        if (canGetInfo.length == skuBeanList[skuBeanIndex].attributes.length) {
          if (skuBeanList[skuBeanIndex].attributes[skuBeanIndexIn].attributeValId == canGetInfo[skuBeanIndexIn].id) {
            iListCount++;
          }
        } else {
          canGetInfoLog = "库存清单不存在此属性" + " ";
        }
      }
      if (iListCount == skuBeanList[skuBeanIndex].attributes.length) {
        haveSkuBean.push(skuBeanList[skuBeanIndex]);
      }
    }

    console.log(haveSkuBean, "存在于库存清单");

    for (var iox = 0; iox < canGetInfo.length; iox++) {
      canGetInfoLog += canGetInfo[iox].attributeValue + " ";
    }

    if (haveSkuBean.length != 0) {
      canGetInfoLog += "价钱:" + haveSkuBean[0].price + " 库存量:" + haveSkuBean[0].count;
    }

    // 重新赋值
    this.setData({
      attrList: listItem,
      infoText: canGetInfoLog,
    })

    // 重新sku运算
    this.onData();
  },

  onLoad: function () {

    // sku算法初始化数据
    this.onData();
  }
})
