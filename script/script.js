// 图标信息
var iconInfo = {
    camel: { url: '/media/animal_icon/camel.PNG', scaledSize: new google.maps.Size(25, 25)},
    cat: { url: '/media/animal_icon/cat2.png',scaledSize: new google.maps.Size(25,25) },
    dog: { url: '/media/animal_icon/dog1.png', scaledSize: new google.maps.Size(25, 25) },
    rhino: { url: '/media/animal_icon/rhino.png' },
    leopard: { url: '/media/animal_icon/leopard.png', scaledSize: new google.maps.Size(50, 50) },
    lion: { url: '/media/animal_icon/lion1.png',scaledSize: new google.maps.Size(25, 25) },
    elephant: { url: '/media/animal_icon/elephant.png', scaledSize: new google.maps.Size(50, 50) },
};

// 地图、标记、复选框等的全局变量
var map;
var markers = {};

function initMap() {
    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-75, -180),
        new google.maps.LatLng(75, 180)
    );

    map = new google.maps.Map(document.getElementById('map-container'), {
        center: { lat: 34.123, lng: 108.456 },
        zoom: 2,
        minZoom: 2,
        maxZoom: 12,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        //scrollwheel: false,
        zoomControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        },
        restriction: {
            latLngBounds: bounds,
            strictBounds: true,
        },
        // language:'zh_HK'
    });

    map.set('styles', mapstyle);
    document.getElementById('zoomInButton').addEventListener('click', function() {
        var currentZoom = map.getZoom();
        var zoomLevels = [2, 3, 5, 12];
        var currentIndex = zoomLevels.indexOf(currentZoom);
        var nextIndex = (currentIndex + 1) % zoomLevels.length;
        var nextZoom = zoomLevels[nextIndex];
        var maxZoom = map.maxZoom;
        if (currentZoom !== nextZoom&&currentZoom<maxZoom) {
            map.setZoom(nextZoom);
        }
    });

    document.getElementById('zoomOutButton').addEventListener('click', function() {
        var currentZoom = map.getZoom();
        var zoomLevels = [2, 3,5, 12];
        var currentIndex = zoomLevels.indexOf(currentZoom);
        var prevIndex = (currentIndex - 1 + zoomLevels.length) % zoomLevels.length;
        var prevZoom = zoomLevels[prevIndex];
        var minZoom = map.minZoom;
        if (currentZoom !== prevZoom&&currentZoom>minZoom) {
            map.setZoom(prevZoom);
        }
    });


    
    
    // document.getElementById('map-container').addEventListener('wheel', function(e) {
    //     e.preventDefault(); // Prevent default scrolling behavior
    //     var currentZoom = map.getZoom();
    //     var zoomLevels = [12, 8, 5, 2];
    //     var currentIndex = zoomLevels.indexOf(currentZoom);
    //     var deltaY = e.deltaY;
    
    //     var newIndex = currentIndex + (deltaY > 0 ? 1 : -1);
    //     if (newIndex >= 0 && newIndex < zoomLevels.length) {
    //         var newZoom = zoomLevels[newIndex];
    
    //         // Get the mouse position within the map container
    //         var offsetX = e.pageX - this.offsetLeft;
    //         var offsetY = e.pageY - this.offsetTop;
    
    //         // Calculate the new center coordinates
    //         var center = map.getCenter();
    //         var scale = Math.pow(2, newZoom - currentZoom);
    //         var worldCoordinate = map.getProjection().fromLatLngToPoint(center);
    //         var newWorldCoordinate = new google.maps.Point(
    //             (offsetX - this.clientWidth / 2) / scale + worldCoordinate.x,
    //             (offsetY - this.clientHeight / 2) / scale + worldCoordinate.y
    //         );
    
    //         var newCenter = map.getProjection().fromPointToLatLng(newWorldCoordinate);
    
    //         // Set the new map center and zoom
    //         map.setCenter(newCenter);
    //         map.setZoom(newZoom);
    //     }
    // });
    
    // google.maps.event.addListener(map, 'zoom_changed', function() {
    //     var currentZoom = map.getZoom();
    //     var allowedZoomLevels = [2,3, 5, 12];
    
    //     if (!allowedZoomLevels.includes(currentZoom)) {
    //         // 找到最接近的允许缩放级别
    //         var closestZoom = allowedZoomLevels.reduce(function(prev, curr) {
    //             return (Math.abs(curr - currentZoom) < Math.abs(prev - currentZoom) ? curr : prev);
    //         });
    
    //         // 将地图缩放设置为最接近的允许缩放级别
    //         map.setZoom(closestZoom);
    //     }
    // });
    

    
   
    google.maps.event.addListener(map, 'zoom_changed', function() {
        var currentZoom = map.getZoom();
        var zoomLevels = [2, 3, 5, 12];
        var currentIndex = zoomLevels.indexOf(currentZoom);
        //console.log('currentIndex', currentIndex);
       
        
   
        zoomSlider.value=currentIndex;
        console.log('当前缩放级别：', currentZoom);
    });
    zoomSlider.addEventListener('input',function(){
    
        var zoomLevels = [2, 3, 5, 12];
        var currentZoom = parseInt(zoomSlider.value); // 获取滑块的值并转换为数字类型
        var targetZoom = zoomLevels[currentZoom]; // 获取对应的缩放级别
        
        map.setZoom(targetZoom);
        console.log('当前缩放级别：', targetZoom);
        

    });

    google.maps.event.addListenerOnce(map, 'idle', function() {
        // 找到所有的复选框
        var checkboxes = document.querySelectorAll('.category-checkbox');
    
        // 遍历复选框并勾选它们
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = true;
        });
    
        // 调用筛选标记函数或其他适当的操作
        filterMarkers(); // 调用筛选标记函数，确保标记根据复选框状态进行过滤
    });

}





function createMarker(position, type, label, categories, content) {
    // 在地图上创建标记
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.lat, position.lng),
        map:null,
        icon: iconInfo[type],
        title: label,
        attributes: {
            A: categories.A || [],
            B: categories.B || [],
            C: categories.C || [],
            D: categories.D || [],
            E: categories.E || []
        },
        content: content,
        visible: true
    });

    // 如果有特定大小需求，设置标记的大小
    if (iconInfo[type].scaledSize) {
        marker.setIcon(iconInfo[type]);
    }
    
    return marker;
}

// 关联复选框和标记
// function attachCheckboxHandler(checkboxId, markerType) {
//     var checkbox = $('#' + checkboxId);

//     checkbox.change(function () {
//         if (checkbox.is(':checked')) {
//             markers[markerType].setMap(map);
//         } else {
//             markers[markerType].setMap(null);
//         }
//     });
// }

// 显示选项卡内容
function showTab(tabName) {
    // 隐藏所有选项卡内容
    $('.tab-content').hide();

    // 显示指定选项卡内容
    $('#' + tabName).show();
}

// 在页面加载后的初始化


handleCheckboxChange('land-Checkbox', '陸上絲綢之路');
handleCheckboxChange('ocean-Checkbox', '海上絲綢之路');


handleCheckboxChange('camel-Checkbox', 'camel');
handleCheckboxChange('cat-Checkbox', 'cat');
handleCheckboxChange('dog-Checkbox', 'dog');
handleCheckboxChange('rhino-Checkbox', 'rhino');
handleCheckboxChange('leopard-Checkbox', 'leopard');
handleCheckboxChange('lion-Checkbox', 'lion');
handleCheckboxChange('elephant-Checkbox', 'elephant');

handleCheckboxChange('xia-Checkbox', '史前至夏商周');
handleCheckboxChange('qinhan-Checkbox', '秦漢');
handleCheckboxChange('sanguo-Checkbox', '三國兩晉南北朝');
handleCheckboxChange('sui-Checkbox', '隋');
handleCheckboxChange('tang-Checkbox', '唐');
handleCheckboxChange('song-Checkbox', '宋');
handleCheckboxChange('yuan-Checkbox', '元');
handleCheckboxChange('ming-Checkbox', '明');
handleCheckboxChange('qing-Checkbox', '清');

handleCheckboxChange('zongjiao-Checkbox', '宗教信仰');
handleCheckboxChange('chaogong-Checkbox', '朝貢');
handleCheckboxChange('shenfen-Checkbox', '身份象徵');
handleCheckboxChange('junshi-Checkbox', '軍事');
handleCheckboxChange('wenhua-Checkbox', '文化娛樂');

handleCheckboxChange('zhong-Checkbox', '中亞');
handleCheckboxChange('nan-Checkbox', '南亞');
handleCheckboxChange('xi-Checkbox', '西亞');
handleCheckboxChange('bei-Checkbox', '北亞');
handleCheckboxChange('dong-Checkbox', '東亞');
handleCheckboxChange('dongnan-Checkbox', '東南亞');

handleCheckboxChange('feizhou-Checkbox', '非洲');
handleCheckboxChange('ouzhou-Checkbox', '歐洲');
handleCheckboxChange('meizhou-Checkbox', '美洲');





var categoryToggleIcon = $('#toggle');
var categoryContainer = $('.category-container');
var isContainerVisible = true;


var filteredMarkers = [];
var markerCluster=null;
var previouslyHiddenMarkers = []; // 在函数外部记录之前隐藏的标记

function filterMarkers() {

    // 在更新标记前记录之前隐藏的标记
    previouslyHiddenMarkers = filteredMarkers.filter(function(marker) {
        return marker.getMap() === null;
    });

    // 清空上次筛选的结果
    filteredMarkers.forEach(function(marker) {
        marker.setMap(null);
    });
    filteredMarkers = [];
    var noCheckboxSelected = $('.category-checkbox:checked').length === 0;

    // 如果没有选中任何复选框，则隐藏所有标记
    if (noCheckboxSelected) {
        filteredMarkers.forEach(function (marker) {
            marker.setMap(null);
        });
        filteredMarkers = []; // 清空筛选的标记数组
        return;
    }

    var selectedCategories = getSelectedCategories();
    
    // 对每个标记进行筛选
    for (var key in markers) {
        var marker = markers[key];
    
        if (marker.attributes && (marker.attributes.A || marker.attributes.B || marker.attributes.C || marker.attributes.D || marker.attributes.E)) {
            var markerCategories = {
                A: marker.attributes.A || [],
                B: marker.attributes.B || [],
                C: marker.attributes.C || [],
                D: marker.attributes.D || [],
                E: marker.attributes.E || []
            };
    
           
            
    
            var isMatching = selectedCategories.every(function(categoryGroup) {
                return categoryGroup.some(function(subCategory) {
                    return markerCategories.A.includes(subCategory) || 
                           markerCategories.B.includes(subCategory) || 
                           markerCategories.C.includes(subCategory) || 
                           markerCategories.D.includes(subCategory) || 
                           markerCategories.E.includes(subCategory);
                });
            });
    
            
            
            if (isMatching) {
                marker.setMap(map);
                filteredMarkers.push(marker);
            }
           
        }
    }
    
    // 清除当前的聚合器
    // if (markerCluster) {
    //     markerCluster.clearMarkers();
    // }

    //创建新的聚合器
    // markerCluster = new MarkerClusterer(map, filteredMarkers, {
    //     gridSize: 2,
    //     minimumClusterSize: 200,
    //     styles: [
    //         { url: 'media/animal_icon/lion_gather.png', width: 50, height: 40, textSize: 18, textColor: 'black' },
    //     ]
    // });
    previouslyHiddenMarkers.forEach(function(marker) {
        marker.setMap(null);
    });
    //创建自定义标签
    

}
// function filterMarkers() {
//     // 清空上次筛选的结果
//     filteredMarkers.forEach(function(marker) {
//         marker.setMap(null);
//     });
//     filteredMarkers = [];

//     var selectedCategories = getSelectedCategories();

//     // 分别处理不同类型的动物标记
//     var lionMarkers = [];
//     var dogMarkers = [];
//     var catMarkers=[];
//     var camelMarkers= [];
    
//     // 对每个标记进行筛选并分类
//     for (var key in markers) {
//         var marker = markers[key];
//         if (marker.attributes && marker.attributes.A.includes('lion')) {
//             lionMarkers.push(marker);
//         } 
//         if (marker.attributes && marker.attributes.A.includes('dog')) {
//             dogMarkers.push(marker);
//         }
//         if (marker.attributes && marker.attributes.A.includes('cat')) {
//             catMarkers.push(marker);
//         }
//         if (marker.attributes && marker.attributes.A.includes('camel')) {
//             camelMarkers.push(marker);
//         }

//     }

//     // 过滤所选的动物类型
//     var filteredLionMarkers = lionMarkers.filter(function(marker) {
//         return isMatchingMarker(marker, selectedCategories);
//     });

//     var filteredDogMarkers = dogMarkers.filter(function(marker) {
//         return isMatchingMarker(marker, selectedCategories);
//     });
//     var filteredCatMarkers = catMarkers.filter(function(marker) {
//         return isMatchingMarker(marker, selectedCategories);
//     });
//     var filteredCamelMarkers = camelMarkers.filter(function(marker) {
//         return isMatchingMarker(marker, selectedCategories);
//     });

//     // 在地图上设置不同类型的聚合器
//     var lionCluster = new MarkerClusterer(map, filteredLionMarkers, {
//         gridSize: 2,
//         minimumClusterSize: 3,
//         styles: [
//             { url: 'media/animal_icon/lion_gather.png', width: 50, height: 40, textSize: 18, textColor: 'black' },
//         ]
//     });

//     var dogCluster = new MarkerClusterer(map, filteredDogMarkers, {
//         gridSize: 2,
//         minimumClusterSize: 3,
//         styles: [
//             { url: 'media/animal_icon/dog1.png', width: 50, height: 40, textSize: 18, textColor: 'black' },
//         ]
//     });
//     var catCluster = new MarkerClusterer(map, filteredCatMarkers, {
//         gridSize: 2,
//         minimumClusterSize: 3,
//         styles: [
//             { url: 'media/animal_icon/cat2.png', width: 50, height: 40, textSize: 18, textColor: 'black' },
//         ]
//     });
//     var camelCluster = new MarkerClusterer(map, filteredCamelMarkers, {
//         gridSize: 2,
//         minimumClusterSize: 3,
//         styles: [
//             { url: 'media/animal_icon/camel.png', width: 50, height: 40, textSize: 18, textColor: 'black' },
//         ]
//     });
// }




function isMatchingMarker(marker, selectedCategories) {
    if (marker.attributes && (marker.attributes.A || marker.attributes.B || marker.attributes.C || marker.attributes.D || marker.attributes.E)) {
        var markerCategories = {
            A: marker.attributes.A || [],
            B: marker.attributes.B || [],
            C: marker.attributes.C || [],
            D: marker.attributes.D || [],
            E: marker.attributes.E || []
        };

        var isMatching = selectedCategories.every(function(categoryGroup) {
            return categoryGroup.some(function(subCategory) {
                return markerCategories.A.includes(subCategory) || 
                       markerCategories.B.includes(subCategory) || 
                       markerCategories.C.includes(subCategory) || 
                       markerCategories.D.includes(subCategory) || 
                       markerCategories.E.includes(subCategory);
            });
        });

        return isMatching;
    }
    return false;
}


function getSelectedCategories() {
    var selectedCategories = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: []
    };

    // 遍历所有复选框
    $('.category-checkbox:checked').each(function() {
        var category = $(this).data('category');
        var subCategory = $(this).val();
        if (subCategory !== '') {
            selectedCategories[category].push(subCategory);
        }
    });

    // 如果某个大类别下没有选择任何子类别，但大类别不是D，则默认选择该大类别下的所有非空子类别
    for (var category in selectedCategories) {
        if (category !== 'D' && selectedCategories[category].length === 0) {
            $('input[data-category="' + category + '"]').each(function() {
                var subCategoryValue = $(this).val();
                // 检查子类别是否为空，如果不为空则加入选择列表
                if (subCategoryValue !== '') {
                    selectedCategories[category].push(subCategoryValue);
                }
            });
        }
    }

    // 移除空的大类别
    for (var category in selectedCategories) {
        if (selectedCategories[category].length === 0) {
            delete selectedCategories[category];
        }
    }

    var formattedCategories = Object.values(selectedCategories).map(function(subCategories) {
        return subCategories;
    });

    return formattedCategories;
}




function handleCheckboxChange(checkboxId, category) {
    var checkbox = $('#' + checkboxId);
    checkbox.change(function () {
        filterMarkers();
    });
}
$('.category-checkbox').change(function() {
    filterMarkers();
});






// 获取图标元素
var toggleIcon = document.getElementById('toggle');

// 获取整个.category-container
var categoryContainer = document.querySelector('.category-container');

// 添加点击事件处理程序

toggleIcon.addEventListener('click', function() {
    if (categoryContainer.style.display === 'flex' || categoryContainer.style.display === '') {
        categoryContainer.style.display = 'none';
        toggleIcon.style.left = '0'; // 将图标移动到屏幕的左边缘
    } else {
        categoryContainer.style.display = 'flex';
        toggleIcon.style.left = '10%'; // 将图标移动回初始位置
    }
});

var slider = document.getElementById('slider');
var controlImage = document.getElementById('controlImage');
var currentValue = parseInt(slider.value);
var intervalId = null;

// 点击图片的事件处理
controlImage.addEventListener('click', function() {
    if (intervalId === null) {
        // 如果 intervalId 为 null，表示当前是停止状态，需要开始自动拖动
        controlImage.src = 'media/animal_icon/leopard.png'; // 切换到暂停图片
        intervalId = setInterval(autoSlide, 1); // 每隔 50 毫秒自动拖动一次
    } else {
        // 否则，当前是运行状态，需要停止自动拖动
        clearInterval(intervalId);
        intervalId = null;
        controlImage.src = 'media/animal_icon/dog.png'; // 切换回播放图片
    }
});




// 自动拖动滑块的函数
function autoSlide() {
    currentValue += 2; // 每次增加 10，你可以根据需要调整
    if (currentValue === 1000 || currentValue === 2000 || currentValue === 3000|| currentValue === 4000|| currentValue === 5000|| currentValue === 6000|| currentValue === 7000|| currentValue === 8000) {
        currentValue += 3; // 跳过边界点
    }
    slider.value = currentValue;

    slider.dispatchEvent(new Event('input')); // 触发 input 事件，模拟用户拖动滑块
    if (currentValue >= 8998) {
        clearInterval(intervalId); // 停止自动拖动的 setInterval
        intervalId = null; // 确保 intervalId 为 null
        controlImage.src = 'media/animal_icon/dog.png'; // 切换回播放图片
    }

}

// 添加滑块值变化的事件监听器，以更新 currentValue
slider.addEventListener('input', function() {
    currentValue = parseInt(slider.value);
});

function toggleAsiaContainer() {
    var asiaContainer = document.getElementById('asiaContainer'); // 获取亚洲地区的容器
    var asiaCheckboxes = asiaContainer.querySelectorAll('.category-checkbox'); // 获取亚洲地区的子复选框

    // 切换亚洲地区容器的显示和隐藏状态
    if (asiaContainer.style.display === 'none' || asiaContainer.style.display === '') {
        asiaContainer.style.display = 'block';
        // 自动勾选亚洲地区的所有子复选框
        asiaCheckboxes.forEach(function(checkbox) {
            checkbox.checked = true;
        });
    } else {
        asiaContainer.style.display = 'none';
        // 取消勾选亚洲地区的所有子复选框
        asiaCheckboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
    }
    filterMarkers();
}


document.getElementById('openWindow').addEventListener('click', function(event) {
    event.preventDefault(); // 阻止默认行为，即不打开链接
  
    // 打开新窗口
    window.open(this.href, '对照表窗口', 'width=800,height=800,top=200,left=400');
  });
  



$(document).ready(function() {
    // 全选复选框点击事件
    $('.category-select-all').click(function() {
        var category = $(this).data('category');
        var checkboxes = $('.category-checkbox[data-category="' + category + '"]');
        checkboxes.prop('checked', $(this).prop('checked'));
        //filterMarkers();
    });

    // 子类别复选框点击事件
    $('.category-checkbox').click(function() {
        var category = $(this).data('category');
        var selectAllCheckbox = $('.category-select-all[data-category="' + category + '"]');
        var checkboxes = $('.category-checkbox[data-category="' + category + '"]');
        // 检查是否有任何一个子类别没有被选中，如果没有则勾选对应的全选复选框
        if (checkboxes.length === checkboxes.filter(':checked').length) {
            selectAllCheckbox.prop('checked', true);
        } else {
            selectAllCheckbox.prop('checked', false);
        }
        //filterMarkers();
    });

    // 其他事件处理和filterMarkers函数等
    // ...
});
document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = document.querySelectorAll('#dynastyCategoryContainer .category-checkbox');
    //var slider = document.querySelector('.slider');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            console.log('Checkbox changed');
            var checkedValues = Array.from(checkboxes)
            
                .filter(function(checkbox) {
                    return checkbox.checked && checkbox.dataset.value !== undefined;
                })
                .map(function(checkbox) {
                    return parseInt(checkbox.dataset.value);
                });
                console.log('Checked values:', checkedValues);
            if (checkedValues.length > 0 ) {
                console.log('Updating slider value');
                var minCheckedValue = Math.min(...checkedValues);
                console.log('minCheckedValue',minCheckedValue)
                slider.value = minCheckedValue;
//         // 触发滑块的input事件，手动更新标记的位置
                var inputEvent = new Event('input');
                slider.dispatchEvent(inputEvent);
                // slider.value = minCheckedValue;
                // slider.dispatchEvent(new Event('input'));
            }
        });
    });
});



// document.addEventListener('DOMContentLoaded', function() {
//     var allCheckboxes = document.querySelectorAll('.category-checkbox');
//     var markerCluster = null; // 初始化聚合器

//     allCheckboxes.forEach(function(checkbox) {
//         checkbox.addEventListener('change', function() {
//             // 获取所有选中的复选框的值
//             var checkedAnimals = Array.from(allCheckboxes)
//                 .filter(function(checkbox) {
//                     return checkbox.checked && checkbox.dataset.value !== undefined;
//                 })
//                 .map(function(checkbox) {
//                     return parseInt(checkbox.dataset.value);
//                 });

//             if (markerCluster) {
//                 markerCluster.clearMarkers();
//             }

//             if (checkedAnimals.length > 0) {
//                 var minCheckedValue = Math.min(...checkedAnimals); // 计算所有已选复选框的最小值
//                 //console.log("123",minCheckedValue)
//                 markerCluster = new MarkerClusterer(map, filteredMarkers, {
//                     //clusterClass: 'custom-cluster',
//                     gridSize: 2,
//                     minimumClusterSize: 200,
//                     styles: checkedAnimals.map(function(value) {
//                         console.log("value", value);
//                         return { 
//                             url: 'media/animal_icon/' + value + '_icon.png', 
//                             width: 50, 
//                             height: 40, 
//                             textSize: 18, 
//                             textColor: 'red',
//                             background: 'yellow', // 添加背景颜色
//                             fontFamily: 'Arial' // 添加字体样式
//                         };
//                     })
//                 });
//             }
//         });
//     });
//     //filterMarkers();
// });


// function updateMarkerCluster(allCheckboxes) {

//     var checkedAnimals = Array.from(allCheckboxes)
//         .filter(function(checkbox) {
//             return checkbox.checked && checkbox.dataset.value !== undefined;
//         })
//         .map(function(checkbox) {
//             return parseInt(checkbox.dataset.value);
//         });

//     if (markerCluster) {
//         markerCluster.clearMarkers(); // 清除已有聚合
//     }

//     if (checkedAnimals.length > 0) {
//         var minCheckedValue = Math.min(...checkedAnimals);
        
//         // 计算所有已选复选框的最小值
//        if (minCheckedValue>=20){
//         minCheckedValue=1;
//        }
      
//         console.log("123",minCheckedValue)
//         markerCluster = new MarkerClusterer(map, filteredMarkers, {
//             //clusterClass: 'custom-cluster',
//             gridSize: 2,
//             minimumClusterSize: 2,
//             styles: checkedAnimals.map(function(value) {
//                 console.log("value", value);
                
//                 return { 
//                     url: 'media/animal_icon/' + value + '_icon.png', 
//                     width: 50, 
//                     height: 40, 
//                     textSize: 18, 
//                     textColor: 'red',
//                     background: 'yellow', // 添加背景颜色
//                     fontFamily: 'Arial' // 添加字体样式
//                 };
//             })
//         });
        
//     }
//     else if (checkedAnimals.length==0){
//         markerCluster = new MarkerClusterer(map, filteredMarkers, {
//             //clusterClass: 'custom-cluster',
//             gridSize: 2,
//             minimumClusterSize: 2,
//             styles:  [{
                
                
//                     url: 'media/animal_icon/0_icon.png', 
//                     width: 50, 
//                     height: 40, 
//                     textSize: 18, 
//                     textColor: 'red',
//                     background: 'yellow', // 添加背景颜色
//                     fontFamily: 'Arial' // 添加字体样式
//                 }]
            
//         });
//     }
// }
// document.addEventListener('DOMContentLoaded', function() {
//     var allCheckboxes = document.querySelectorAll('.category-checkbox');

//     // 在页面加载时自动进行聚合
//     //updateMarkerCluster(allCheckboxes);

//     // 对每个复选框添加事件监听器，以便在更改状态时更新聚合
//     allCheckboxes.forEach(function(checkbox) {
//         checkbox.addEventListener('change', function() {
//             updateMarkerCluster(allCheckboxes);
//         });
//     });
// });


// 获取所有复选框
var checkboxes = document.querySelectorAll('input[type="checkbox"]');

// 为每个复选框添加更改事件监听器
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
       
            // 如果复选框被选中，则暂停自动滑块函数
            clearInterval(intervalId);
            intervalId = null;
            controlImage.src = 'media/animal_icon/dog.png';
        
        
                           
    });
});

const checkboxContainer1 = document.getElementById('animalCategoryContainer');
const selectAllCheckbox1 = checkboxContainer1.querySelector('.category-select-all');
const otherCheckboxes1 = checkboxContainer1.querySelectorAll('.category-checkbox:not(.category-select-all)');

// 监听容器内的复选框状态变化
otherCheckboxes1.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const allOthersChecked = [...otherCheckboxes1].every(cb => cb.checked);

        // 根据情况勾选/取消全选复选框
        selectAllCheckbox1.checked = allOthersChecked;
    });
});

const checkboxContainer2 = document.getElementById('dynastyCategoryContainer');
const selectAllCheckbox2 = checkboxContainer2.querySelector('.category-select-all');
const otherCheckboxes2 = checkboxContainer2.querySelectorAll('.category-checkbox:not(.category-select-all)');

// 监听容器内的复选框状态变化
otherCheckboxes2.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const allOthersChecked = [...otherCheckboxes2].every(cb => cb.checked);

        // 根据情况勾选/取消全选复选框
        selectAllCheckbox2.checked = allOthersChecked;
    });
});

const checkboxContainer3 = document.getElementById('waysCategoryContainer');
const selectAllCheckbox3 = checkboxContainer3.querySelector('.category-select-all');
const otherCheckboxes3 = checkboxContainer3.querySelectorAll('.category-checkbox:not(.category-select-all)');

// 监听容器内的复选框状态变化
otherCheckboxes3.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const allOthersChecked = [...otherCheckboxes3].every(cb => cb.checked);

        // 根据情况勾选/取消全选复选框
        selectAllCheckbox3.checked = allOthersChecked;
    });
});
const checkboxContainer4 = document.getElementById('areaCategoryContainer');
const selectAllCheckbox4 = checkboxContainer4.querySelector('.category-select-all');
const otherCheckboxes4 = checkboxContainer4.querySelectorAll('.category-checkbox:not(.category-select-all)');

// 监听容器内的复选框状态变化
otherCheckboxes4.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        const allOthersChecked = [...otherCheckboxes4].every(cb => cb.checked);

        // 根据情况勾选/取消全选复选框
        selectAllCheckbox4.checked = allOthersChecked;
    });
});
// document.addEventListener('DOMContentLoaded', function() {
//     // 获取所有的复选框
//     var checkboxes = document.querySelectorAll('.category-checkbox');

//     // 遍历复选框并设置为选中状态
//     checkboxes.forEach(function(checkbox) {
//         checkbox.checked = true;
//     });
// });


