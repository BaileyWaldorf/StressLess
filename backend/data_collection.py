# imports
import pandas as pd
import numpy as np
import datetime
import json
import re

import scipy.stats as stats
import matplotlib.pyplot as plt
import xml.etree.ElementTree as ET
from dateutil import parser



# import original BPM data
with open('data/test.json', 'r') as f:
    data = f.read()
datas = data.split("}")


# parse data out of xml mormat
def parse_start(description):
    start_date = re.search("\"startDate\": \"(.*)\".*", description)
    start_date = start_date.groups()[0]
    start_date = parser.parse(start_date)
    return start_date

def parse_end(description):
    end_date = re.search("\"endDate\": \"(.*)\".*", description)
    end_date = end_date.groups()[0]
    end_date = parser.parse(end_date)
    return end_date

def parse_value(description):
    value = re.search("\"value\": \"(.*)\".*", description)
    value = value.groups()[0]
    value = float(value)
    return value


# parse data out of xml mormat
hrv = pd.DataFrame(datas, columns=["values"])
hrv = hrv[1:-1]
hrv["start_date"] = hrv["values"].apply(lambda x: parse_start(x))
hrv["end_date"] = hrv["values"].apply(lambda x: parse_end(x))
hrv["value"] = hrv["values"].apply(lambda x: parse_value(x))
del(hrv["values"])
# hrv["value"].plot()

# calculate averages per day
hrv_daily_avg = hrv.groupby(pd.Grouper(key='start_date', freq="D")).mean()
hrv_daily_avg = pd.DataFrame(hrv_daily_avg)
hrv_daily_avg = hrv_daily_avg#.reset_index()
hrv_daily_avg


# remove outliers
hrv_daily_avg = hrv_daily_avg[hrv_daily_avg["value"]<125]
# hrv_daily_avg.plot()

# to csv
hrv_daily_avg.to_csv("results/hrv_daily_avg.csv")


### From 2019-01, randomly increase by 15-20%
# From 2019-01, randomly increase by 15-20%
hrv_daily_avg_0 = hrv_daily_avg.copy()
hrv_daily_avg_0 = hrv_daily_avg_0.reset_index()

count_before_dates = len(hrv_daily_avg_0[hrv_daily_avg_0["start_date"].dt.date<=datetime.date(2019,1,1)])
count_after_dates = len(hrv_daily_avg_0[hrv_daily_avg_0["start_date"].dt.date>datetime.date(2019,1,1)])
count_before_dates, count_after_dates

# create multiplication matrix
sames = np.ones(count_before_dates)
random_increase = np.random.uniform(low=1.15, high=1.2, size=count_after_dates)
multilpy_matrix = np.concatenate([sames,random_increase])


# multiply by matrix to increase values after event
hrv_daily_avg_0["value"] = hrv_daily_avg_0["value"]*multilpy_matrix
# hrv_daily_avg_0

#set index
hrv_daily_avg_0 = hrv_daily_avg_0.set_index("start_date")
#hrv_daily_avg_0.plot()

# to csv
hrv_daily_avg_0.to_csv("results/hrv_daily_avg_w_increase.csv")


# ------------------------
# ## create 40 samples
# ------------------------

# creat date range for date index of sample users
date_range = hrv_daily_avg_3_months_0["start_date"][0:len(hrv_daily_avg_3_months_0)]
date_range = list(date_range)#.rest_index()

# define column names for sample user data
col_names = []
for i in list(range(0,40)):
    col_names.append("user_"+str(i))

# create random values, user data
hrv_daily_avg_4_month = np.random.uniform(low=10, high=80, size=[len(hrv_daily_avg_3_months_0),40])
hrv_daily_avg_4_month = pd.DataFrame(hrv_daily_avg_4_month, columns=col_names)
hrv_daily_avg_4_month["date"] = date_range
# hrv_daily_avg_4_month.head(2)

# ---------------------------------
# ### randomly increase by 15-20%
# ---------------------------------

# From 2018-03, randomly increase by 15-20%
count_before_dates = len(hrv_daily_avg_4_month[hrv_daily_avg_4_month["date"].dt.date<=datetime.date(2018,3,1)])
count_after_dates = len(hrv_daily_avg_4_month[hrv_daily_avg_4_month["date"].dt.date>datetime.date(2018,3,1)])
count_before_dates, count_after_dates

# create multiplication matrix
for i in list(range(0,40)):
    sames = np.ones(count_before_dates)
    random_increase = np.random.uniform(low=1.15, high=1.2, size=count_after_dates)
    multilpy_matrix = np.concatenate([sames,random_increase])
    
    column_name = "user_" + str(i)
    hrv_daily_avg_4_month[column_name] = hrv_daily_avg_4_month[column_name]*multilpy_matrix

# add before/after column
hrv_daily_avg_4_month["event"] = hrv_daily_avg_4_month["date"].apply(lambda x: "before" if x<=datetime.date(2018,3,1) else "after" )


# --------------------------------------------
### mean of all 40 users, over 4 months
# --------------------------------------------

# calculate daily averages, over all users
hrv_daily_avg_4_month['avg'] = ex.mean(axis=1)
# clean up plot axis
hrv_daily_avg_4_month["avg"].plot(ylim= (10,80))

# hrv_daily_avg_4_month[["date", "event", "avg", "overall_avg", "change_date", "percent_difference", "num_participants"]]

# add change_date column
hrv_daily_avg_4_month["change_date"]=datetime.datetime(2017,2,1)

# add cumulate average column
avg_before = hrv_daily_avg_4_month[hrv_daily_avg_4_month["event"]=="before"]["avg"].mean()
avg_after = hrv_daily_avg_4_month[hrv_daily_avg_4_month["event"]=="after"]["avg"].mean()
hrv_daily_avg_4_month["overall_avg"]= hrv_daily_avg_4_month.apply(lambda row: avg_before if row["event"]=="before" else avg_after, axis=1)

# add percent_difference column
percent_diff = (avg_after-avg_before)*100/np.mean([avg_after,avg_before])
hrv_daily_avg_4_month["percent_difference"] = percent_diff

# add num_participants column
hrv_daily_avg_4_month["num_participants"] = 40

# to csv
hrv_daily_avg_4_month[["date", "event", "avg", "overall_avg", "change_date", "percent_difference", "num_participants"]].to_csv("results/hrv_daily_avg_4_months_40users.csv")

