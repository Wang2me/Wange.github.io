// buttonContainer.addEventListener('click', function(event) {
//     if (event.target.classList.contains('timeline-button')) {
//         var buttonValue = event.target.getAttribute('data-value');
//         slider.value = buttonValue;
//         // 触发滑块的input事件，手动更新标记的位置
//         var inputEvent = new Event('input');
//         slider.dispatchEvent(inputEvent);
//         filterMarkers();
//     }

// });
// buttonContainer.addEventListener('click', function(event) {
//     if (event.target.classList.contains('timeline-button')) {
//         var buttonValue = event.target.getAttribute('data-value');
        
//         // 清除之前选择的复选框
//         $('.category-checkbox[data-category="B"]').prop('checked', false);
        
//         // 根据按钮值选择对应的复选框并设置为选中状态
//         if (buttonValue === '8000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"]').prop('checked', true);
//         }
//         if (buttonValue === '7000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"]').prop('checked', true);
//         }
//         if (buttonValue === '6000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"]').prop('checked', true);
//         }
//         if (buttonValue === '5000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"], input[value="隋"]').prop('checked', true);
//         }
//         if (buttonValue === '4000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"], input[value="隋"],input[value="唐"]').prop('checked', true);
//         }
//         if (buttonValue === '3000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"], input[value="隋"],input[value="唐"],input[value="宋"]').prop('checked', true);
//         }        
//         if (buttonValue === '2000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"], input[value="隋"],input[value="唐"],input[value="宋"],input[value="元"]').prop('checked', true);
//         }
//         if (buttonValue === '1000') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"], input[value="隋"],input[value="唐"],input[value="宋"],input[value="元"],input[value="明"]').prop('checked', true);
//         }
//         if (buttonValue === '0') {
//             // 选中A类别的1234个复选框
//             $('input[value="史前至夏商周"], input[value="秦漢"], input[value="三國兩晉南北朝"], input[value="隋"],input[value="唐"],input[value="宋"],input[value="元"],input[value="明"],input[value="清"]').prop('checked', true);
//         }
        
//         // 触发change事件，更新地图标记
//         $('.category-checkbox').trigger('change');
//     }
// });

