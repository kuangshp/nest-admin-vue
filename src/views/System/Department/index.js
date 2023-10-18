export const tableOptions = [
  {
    align: 'center',
    width: 50,
    type: 'selection',
    fixed: 'left',
  },
  {
    prop: 'username',
    label: '用户名',
    width: 180,
  },
  {
    prop: 'parentName',
    label: '父节点',
  },
  {
    prop: 'tenantName',
    label: '所属商户',
    width: 180,
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'sort',
    label: '排序',
    align: 'center',
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    align: 'center',
    width: 180,
  },
  {
    prop: 'updatedAt',
    label: '更新时间',
    align: 'center',
    width: 180,
  },
  // {
  //   label: '操作',
  //   action: true,
  //   align: 'center',
  //   width: 300,
  //   fixed: 'right',
  // },
];
export const queryFormOption = [
  {
    type: 'input',
    label: '部门名称',
    prop: 'title',
  },
  {
    type: 'select',
    prop: 'status',
    label: '状态',
    children: [
      {
        type: 'option',
        label: '正常',
        value: '0',
      },
      {
        type: 'option',
        label: '禁用',
        value: '1',
      },
    ],
  },
];

export const formOption = (departmentList) => {
  return [
    {
      type: 'treeSelect',
      label: '上级部门',
      prop: 'parentId',
      required: true,
      option: departmentList,
    },
    {
      type: 'input',
      label: '部门名称',
      prop: 'title',
      required: true,
    },
    {
      type: 'input',
      label: '负责人',
      prop: 'name',
    },
    {
      type: 'input',
      label: '电话',
      prop: 'mobile',
    },
    {
      type: 'input',
      label: '电邮地址',
      prop: 'email',
    },
    {
      type: 'number',
      label: '排序',
      prop: 'sort',
    },
    {
      type: 'input',
      label: '描述',
      prop: 'description',
      attrs: {
        type: 'textarea',
      },
    },
  ];
};
