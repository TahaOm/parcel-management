# Generated by Django 3.2.7 on 2021-12-15 19:40

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import parcel.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plot',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(
                    upload_to=parcel.models.upload_to, verbose_name='Image')),
                ('geofence', django.contrib.gis.db.models.fields.PolygonField(srid=4326)),
            ],
        ),
    ]
