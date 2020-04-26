/*
阿里的工程师们遇到了一个拥挤的地图（如图 https://img.alicdn.com/tfs/TB1f53PCYH1gK0jSZFwXXc7aXXa-720-1280.png），
想请你帮忙把地图中的 POI 点稀疏开来，变得不那么拥挤。你可以合理的合并一些 POI 点，使得地图上不存在相互覆盖的点，POI 点可以看做是一个直径为 10 的圆点。
（请注意：选择一种你认为合理的合并方法即可，在完成目标的情况下，尽可能多的保留地图上的点）
数据范围：0 < POI 点的数量 <= 100
完成函数getPOI，它的作用是将入参提供的一系列 POI 点进行稀疏，让地图显得不那么拥挤。

*/

/*方法说明
*@method getPOI
*@param {Object} mapInfo 提供地图的宽和高，例如：{ height: 600, weight: 800 }
*@param {Array} poiList 提供一个 poi 点列表， 例如：[{ x: 101, y: 10 }, { x: 0, y: 28 }, ...]
*@return {Array} 返回一个 poiList，是稀疏后的 poi 点列表
x y  -->  跟着遍历的时候  取值范围逐渐减小   取一个   
[{x: {left:0;
       right:index*80
    },
  y:{
  top:10,
  down:0
  }  
    }]

[{ x: 101, y: 10 },  { x: 0, y: 28 }, ...]   { x: 101, y: 10 }   96-106 5-15

[{x:1,y:1},{x:0,y:3}]
*/

const getPOI = (mapInfo, poiList) => {
    /* TODO */
    let poiRest = [];
    let poiMapArr = [];
    let i = 0;
    for (let i = 0; i < poiLIst.len; i++) {
        poiMapArr.push({ x: poiLIst[i].x % 10, y: poiLIst[i].y % 10 })
    }



}