function bubbleSort(nums) {
    const l = nums.length;
    
    for (let i = 0; i < l - 1; i++) {
        for (let j = 0; j < l - i; j++) {
            if (nums[j] > nums[j + 1]) {
                swap(nums, j, j + 1);   
            }
        }
    }

    console.log(nums);
    return nums;
}


function swap(arr, i, j) {
    const t = arr[j];
    arr[j] = arr[i];
    arr[i] = t;
}

bubbleSort([3, 2, 4, 4, 5, 1, 9, 10, 100, 3])