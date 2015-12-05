# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151204231304) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.date     "date"
    t.string   "description"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.time     "start_time"
    t.time     "end_time"
    t.date     "end_date"
    t.string   "city"
    t.string   "address"
    t.string   "state"
    t.integer  "team_lead"
    t.integer  "project_manager"
    t.integer  "product_specialist"
    t.integer  "hospitality_server"
    t.integer  "promotional_model"
    t.integer  "event_manager"
    t.string   "generic_title"
    t.string   "generic_location"
    t.string   "venue_contact"
    t.string   "region"
    t.string   "notes"
    t.integer  "shift_id"
  end

  create_table "events_users", force: :cascade do |t|
    t.integer "event_id"
    t.integer "user_id"
  end

  create_table "shifts", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "shifts", ["event_id"], name: "index_shifts_on_event_id", using: :btree
  add_index "shifts", ["user_id"], name: "index_shifts_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
    t.integer  "role"
    t.string   "sex"
    t.datetime "dob"
    t.string   "mobile"
    t.string   "ethnicity"
    t.string   "height"
    t.string   "weight"
    t.string   "t_shirt_size"
    t.string   "dress_size"
    t.string   "chest"
    t.string   "cup_size"
    t.string   "hip"
    t.string   "waist"
    t.string   "shoe_size"
    t.string   "eye_color"
    t.string   "hair_color"
    t.string   "hair_length"
    t.string   "tattoes"
    t.string   "address"
    t.string   "unit"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "bio"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
