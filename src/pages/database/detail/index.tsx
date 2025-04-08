/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 11:08:56
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-08 13:49:18
 * @FilePath: /data-management-terminal/src/pages/database/detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from "react";
import type { TableColumnType } from "antd";
import { Table, Card, Space, Row, Col, DatePicker, Form, Button, message } from "antd";
// import { getChannelDataBoard } from "../../../apis/index";
import { getChannelId } from "../../../utils/getChannelId";
import { removeEmptyValues } from "../../../utils/removeEmptyObj";
import { getTableScroll } from "../../../utils/getTableScroll";

type DatabaseDetailCloumns = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export const DatabaseDetail = () => {
  const [total, setTotal] = useState<number>(0);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [scrollY, setScrollY] = useState<any>(0)

  
  const [form] = Form.useForm();

  useEffect(() => {
    setScrollY(getTableScroll())
  }, [])

  useEffect(() => {
    const data = {
      channelId: getChannelId(),
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelDataBoard(data);
  }, []);

  const queryChannelDataBoard = async (data: any) => {
    setLoading(true);
    // const result = (await getChannelDataBoard(data)) as {
    //   code: string;
    //   data: any;
    //   message: string
    // };
    // if (result.code == "10000") {
    //   setLoading(false);
    //   if (result.data) {
    //     setTotal(result.data.total);
    //   }
    //   if (
    //     result.data &&
    //     result.data.records &&
    //     result.data.records.length != 0
    //   ) {
    //     setDataSource(result.data.records);
    //   } else {
    //     setDataSource([]);
    //   }
    // } else {
    //   messageApi.open({
    //     type: 'error',
    //     content: `${result.message}`
    //   })
    //   setLoading(false);
    //   setDataSource([]);
    // }
  };

  const onReset = () => {
    form.resetFields();
    const data = {
      channelId: getChannelId(),
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelDataBoard(data);
  };

  const onFiltrate = () => {
    const formResult = form.getFieldsValue();
    // eslint-disable-next-line prefer-const
    let data = {
      channelId: getChannelId(),
      pageNum: 1,
      pageSize: 20,
    };
    if (formResult.date) {
      queryChannelDataBoard({
        ...data,
        date: formResult.date ? formResult.date.format("YYYYMMDD") : "",
      });
    } else {
      queryChannelDataBoard({
        ...data,
      });
    }
  };

  const columns: TableColumnType<DatabaseDetailCloumns>[] = [
    {
      title: "时间",
      dataIndex: "date",
    },
    {
      title: "学校",
      dataIndex: "schoolName",
      width: 320
    },
    {
      title: "当日有效打卡任务",
      dataIndex: "cardTaskNum",
    },
    {
      title: "应打卡人数",
      dataIndex: "totalCardPersonNum",
      render(value, record, index) {
        return <span>{value ? value : 0}</span>;
      },
    },
    {
      title: "实际打卡人数",
      dataIndex: "cardPersonNum",
      render(value, record, index) {
        return <span>{value ? value : 0}</span>;
      },
    },
    {
      title: "打卡率",
      dataIndex: "cardRate",
      render(value, record, index) {
        return <span>{value ? value : 0}%</span>;
      },
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex", height: '100%' }}>
      {contextHolder}
      <Card variant="borderless">
        <Row justify="space-between">
          <Col span={8}>
            <Form form={form}>
              <Form.Item style={{ marginBottom: 0 }} name="date" label="日期">
                <DatePicker style={{ width: 260 }} placeholder="日期筛选" />
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <Button
              type="default"
              style={{ marginRight: 12 }}
              onClick={onReset}
            >
              重置
            </Button>
            <Button type="primary" onClick={onFiltrate}>
              筛选
            </Button>
          </Col>
        </Row>
      </Card>
      <Card  variant="borderless">
        <Table
          // scroll={{ y: 86 * 5 }}
          scroll={{ y: scrollY }}
          columns={columns}
          bordered
          loading={loading}
          dataSource={dataSource}
          pagination={{
            position: ["bottomRight"],
            pageSize: 20,
            total,
            onChange(page, pageSize) {
              const formResult = form.getFieldsValue();
              const data = {
                channelId: getChannelId(),
                date: formResult.date
                  ? formResult.date.format("YYYYMMDD")
                  : "",
                pageNum: page,
                pageSize: pageSize,
              };
              queryChannelDataBoard(removeEmptyValues(data));
              
            },
          }}
        />
      </Card>
    </Space>
  );
};
