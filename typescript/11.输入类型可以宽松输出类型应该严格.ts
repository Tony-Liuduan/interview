/**
 * @fileoverview Item 29: Be Liberal in What You Accept and Strict in What You Produce
 * 
 * 输入类型可以宽松，输出类型应该严格
 * 
 * 
 * 这个想法被称为健壮性原则或Postel法则，以Jon Postel的名字命名，他在TCP的上下文中编写了这个原理：
 *      『 TCP实现应该遵循健壮性的一般原则: 在你所做的事情上保持保守，在从他人那里接受的事情上保持自由 』
 * 
 * 
 * 类似的规则也适用于函数契约：对于你的函数来说，函数接受的输入内容方面是宽泛的，但在函数输出内容方面通常应该更具体
 * 
 * 
 */


/**
 * 举例：3D mapping API 提供了 2 个方法
 *  * 设置相机位置
 *  * 计算一个边界框的视口
 * 
 */
declare function setCamera(camera: CameraOptions): void;
// viewportForBounds 的返回值可以直接传递给 setCamera 设置相机位置
declare function viewportForBounds(bounds: LngLatBounds): CameraOptions;


// CameraOptions中的字段都是可选的，因为您可能希望只设置中心或缩放，而不改变轴承或间距
interface CameraOptions {
    center?: LngLat;
    zoom?: number;
    bearing?: number;
    pitch?: number;
}

// LngLat 类型也使 setCamera 在它接受的内容上自由
type LngLat =
    { lng: number; lat: number; } |
    { lon: number; lat: number; } |
    [number, number];

// LngLatBounds 类似是宽松自由的 "liberal"
type LngLatBounds =
    { northeast: LngLat, southwest: LngLat } |
    [LngLat, LngLat] |
    [number, number, number, number];

// 由于 LngLat 已经容纳了 3 种形式，所以 LngLatBounds 有不少于 19 (3*3 + 3*3 +1) 种可能的形式。啊，真的好自由啊，Liberal indeed!

function focusOnFeature() {
    const bounds: [number, number, number, number] = [1, 2, 3, 4];
    const camera = viewportForBounds(bounds); // 返回 CameraOptions
    setCamera(camera);
    const { center: { lat, lng }, zoom } = camera;
    // TypeError: 类型“LngLat”上不存在属性“lat”
    // TypeError: 类型“LngLat”上不存在属性“lng”
    zoom;  // Type is number | undefined
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

/**
 * 我靠，只有 zoom 属性时存在的，但，可但是 zoom 被推断为 number | undefined，也是有问题的...
 * 
 * 总结下原因：
 *      出现上诉问题的原因是 viewportForBounds 这个方法
 *      他不仅接受参数类型是宽泛自由的，返回的数据类型也是自由的
 * 
 * 解决方案：
 *      如果想要正确使用 camera 就要使用各种 if else 判断逻辑，帮助缩小类型推断
 * 
 * 所以：一个更好用的API应该对 return 类型缩小类型宽度，严格类型
 * 
 * 
 * 一种方法是区分坐标的规范格式。按照JavaScript区分“数组”和“类数组”的惯例
 * 你可以在LngLat和LngLat like之间画出一个区别
 * 您还可以区分完全定义的Camera类型和setCamera接受的部分版本
 */


/**
 * 好的示例：
 */
declare function setCameraNew(camera: CameraOptions_NEW): void;
declare function viewportForBoundsNew(bounds: LngLatBounds_NEW): Camera_NEW;


/**
 * 输入值：给类型变得宽泛 option
 */
interface CameraOptions_NEW extends Omit<Partial<Camera_NEW>, 'center'> {
    center?: LngLatLike_NEW;
}

/**
 * 输出值：缩窄类型范围
 */
interface Camera_NEW {
    center: LngLat_NEW;
    zoom: number;
    bearing: number;
    pitch: number;
}

/**
 * 输出值：缩窄类型范围
 */
interface LngLat_NEW {
    lng: number;
    lat: number;
};

/**
 * 输入值：放宽类型范围，不和 LngLat_NEW 混用
 */
type LngLatLike_NEW =
    LngLat_NEW |
    { lon: number; lat: number; } |
    [number, number];

/**
 * 输入值：放宽类型范围
 */
type LngLatBounds_NEW =
    { northeast: LngLatLike_NEW, southwest: LngLatLike_NEW } |
    [LngLatLike_NEW, LngLatLike_NEW] |
    [number, number, number, number];


/**
 * 现在好了，camera 的类型是确切的，api 变得好用了，不用担心类型错误了
 */
function focusOnFeatureNew() {
    const bounds: [number, number, number, number] = [1, 2, 3, 4];
    const camera = viewportForBoundsNew(bounds); // 返回 CameraOptions
    setCameraNew(camera);
    const { center: { lat, lng }, zoom } = camera;
    window.location.search = `?v=@${lat},${lng}z${zoom}`;
}

/**
 * Things to Remember
 *    
 * Input types tend to be broader than output types. 
 * Optional properties and union types are more common in parameter types than return types. 
 * To reuse types between parameters and return types, introduce a canonical form (for return types) and a looser form (for parameters).
 * 
 * 
 * 输入类型往往比输出类型宽泛
 * 可选类型 和 联合类型应应用于函数参数类型，而不是返回值类型
 * 对函数参数类型可以宽松，函数返回值类型应该严格
 */