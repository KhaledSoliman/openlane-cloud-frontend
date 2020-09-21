import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import { reportSections } from 'src/constants/jobConstants';
import { hostname } from 'src/api/config';

const COL1_WIDTH = 60;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 24
  },
  h1: {
    fontSize: 24,
    fontWeight: 500
  },
  h5: {
    fontSize: 12,
    fontWeight: 500
  },
  h6: {
    fontSize: 10,
    fontWeight: 500
  },
  body1: {
    fontSize: 9,
    lineHeight: 1.5
  },
  body2: {
    fontSize: 8,
    lineHeight: 1.5
  },
  mb1: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    width: 50
  },
  company: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  references: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  billing: {
    marginTop: 32
  },
  items: {
    marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto'
  },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    borderStyle: 'solid'
  },
  tableCell1: {
    padding: 6,
    width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 6,
    width: `${COLN_WIDTH}%`
  },
  alignRight: {
    textAlign: 'right'
  }
});

const ReportsPDF = ({ job, report }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image
              source="/static/logo.png"
              style={styles.brand}
            />
            <Text style={styles.h5}>
              {hostname}
            </Text>
          </View>
          <View>
            <Text style={styles.h1}>
              {job.status.toUpperCase()}
            </Text>
            <Text style={styles.h5}>
              Job #
              {job.jobId}
            </Text>
          </View>
        </View>
        <View style={styles.references}>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Completion Date
            </Text>
            <Text style={styles.body1}>
              {moment(job.completedAt).format('DD MMM YYYY | hh:mm')}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Submission Date
            </Text>
            <Text style={styles.body1}>
              {moment(job.createdAt).format('DD MMM YYYY | hh:mm')}
            </Text>
          </View>
          <View>
            <Text style={[styles.h5, styles.mb1]}>
              Job Number
            </Text>
            <Text style={styles.body1}>
              {job.jobId}
            </Text>
          </View>
        </View>
        <View style={styles.items}>
          {report.map((run, i) => {
            return (
              <>
                <Text style={[styles.h5, styles.mb1]}>
                  {run.design + ' | ' + run.config}
                </Text>
                {reportSections.map((section, sectionIndex) => (
                  <>
                    <Text style={[styles.h6, styles.mb1, styles.items]}>
                      {section.sectionName}
                    </Text>
                    <View style={styles.table}>
                      <View style={styles.tableBody}>
                        {section.fields.map((field, fieldIndex) => {
                            return (
                              <View key={fieldIndex} style={styles.tableRow}>
                                <View style={styles.tableCell1}>
                                  <Text style={styles.h6}>
                                    {field.label}
                                  </Text>
                                </View>
                                <View style={styles.tableCellN}>
                                  <Text style={[styles.h6, styles.alignRight]}>
                                    {run[field.id]}{field.unit && ` ${field.unitLabel}`}
                                  </Text>
                                </View>
                              </View>
                            );
                          }
                        )}
                      </View>
                    </View>
                  </>
                ))}
              </>
            );
          })}
        </View>
        <View style={styles.notes}>
          <Text style={[styles.h5, styles.mb1]}>
            Notes
          </Text>
          <Text style={styles.body1}>
            Openlane cloud is still under development (V1.0.0 Alpha)
          </Text>
        </View>
      </Page>
    </Document>
  );
};

ReportsPDF.propTypes = {
  report: PropTypes.array.isRequired,
  job: PropTypes.object.isRequired
};

export default ReportsPDF;
