/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/*
 * @Author: gaowei1012 gyb2020018@163.com
 * @Date: 2025-04-02 15:21:02
 * @LastEditors: gaowei1012 gyb2020018@163.com
 * @LastEditTime: 2025-04-03 17:06:43
 * @FilePath: /management-terminal/src/pages/income/indexes/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from "react";
import type { TableColumnType } from "antd";
import { Space, Table, Select, Form, Row, Col, Button, Card, message } from "antd";
import { getCorpList, getChannelOrderCount } from "../../../apis/index";
import { removeEmptyValues } from '../../../utils/removeEmptyObj'
import { getChannelId } from "../../../utils/getChannelId";
import { getTableScroll } from "../../../utils/getTableScroll";
import Utils from "../../../utils/index";

// import dayjs from "dayjs";

type DatabaseDetailCloumns = {};

type CorpState = {
  corpId: string;
  schoolName: string;
};

const { Option } = Select;

export const IncomeIndex = () => {
  const [corplist, setCorplist] = useState<CorpState[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [scrollY, setScrollY] = useState<any>(0)

  useEffect(() => {
    setScrollY(getTableScroll())
  }, [])

  useEffect(() => {
    queryCorpList();
    const data = {
      channelId: getChannelId(),
      corpId: "",
      date: "",
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelOrderCount(removeEmptyValues(data));
  }, []);

  // 学校
  const queryCorpList = async () => {
    const storagelist = Utils.getStorage("corplist");
    if (storagelist) {
      const temp = JSON.parse(storagelist);
      setCorplist(temp);
    } else {
      const result = (await getCorpList(getChannelId())) as {
        code: string;
        data: CorpState[];
      };
      if (result.code == "10000") {
        if (result.data && result.data.length != 0) {
          setCorplist(result.data);
        } else {
          setCorplist([]);
        }
      }
    }
  };

  // 列表
  const queryChannelOrderCount = async (data: any) => {
    setLoading(true);
    const result = (await getChannelOrderCount(data)) as {
      code: string;
      data: any;
      message: string
    };
    if (result.code == "10000") {
      setLoading(false);
      if (result.data) {
        setTotal(result.data.total);
      }
      if (
        result.data &&
        result.data.records &&
        result.data.records.length != 0
      ) {
        setDataSource(result.data.records);
      } else {
        setDataSource([]);
      }
    } else {
      messageApi.open({
        type: 'error',
        content: `${result.message}`
      })
      setDataSource([])
      setLoading(false);
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
    },
    {
      title: "合计分成金额(元)",
      dataIndex: "payableAmount",
      render(value, record, index) {
        return <span>{value ? `${value / 100}` : 0}</span>;
      },
    },
    {
      title: "收入笔数",
      dataIndex: "incomeNum",
    },
    {
      title: "收入金额(元)",
      dataIndex: "incomeAmount",
      render(value, record, index) {
        return <span>{value ? `${value / 100}` : '0'}</span>;
      },
    },
    {
      title: "退款笔数",
      dataIndex: "refundNum",
    },
    {
      title: "退款金额(元)",
      dataIndex: "refundAmount",
      render(value, record, index) {
        return <span>{value ? `${value / 100}` : 0}</span>;
      },
    },
    {
      title: "备注",
      dataIndex: "note",
      render(value, record, index) {
        return <span>{value ? value : "-"}</span>;
      },
    },
  ];
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    const data = {
      channelId: getChannelId(),
      corpId: null,
      date: null,
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelOrderCount(removeEmptyValues(data));
  };

  const onFiltrate = () => {
    const formResult = form.getFieldsValue();
    const data = {
      channelId: getChannelId(),
      corpId: formResult.corpId ? formResult.corpId : "",
      date: formResult.startDate ? formResult.startDate.format("YYYYMMDD") : "",
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelOrderCount(removeEmptyValues(data));
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Card variant="borderless">
        <Row justify="space-between">
          <Col span={6}>
            <Form form={form}>
              <Form.Item style={{ marginBottom: 0 }} name="corpId" label="学校">
                <Select placeholder="学校筛选" allowClear onChange={() => {}}>
                  {corplist.map((item) => {
                    return <Option key={item.corpId}>{item.schoolName}</Option>;
                  })}
                </Select>
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
      <Card variant="borderless">
        <Table
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
                corpId: formResult.corpId ? formResult.corpId : "",
                date: formResult.startDate
                  ? formResult.startDate.format("YYYYMMDD")
                  : "",
                pageNum: page,
                pageSize: pageSize,
              };
              queryChannelOrderCount(removeEmptyValues(data));
              console.log("分页", page, pageSize);
            },
          }}
        />
      </Card>
    </Space>
  );
};
