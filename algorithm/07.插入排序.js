function insertSort(nums) {
    if (!nums) {
        return [];
    }

    if (nums?.length <= 1) {
        return nums;
    }

    const l = nums.length;
    
    for (let i = 0; i < l; i++) {
        const insertValue = nums[i];
        let j = i - 1;
        while (j >= 0 && nums[j] > insertValue) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = insertValue;
    }

    console.log(nums);
    return nums;
}

insertSort([3, 2, 4, 4, 5, 1, 9, 10, 100, 3]);